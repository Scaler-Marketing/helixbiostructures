// Cloudflare Worker Form Handler (Webflow Intercept) - Production Version
// Automatically detects forms with cf-form attribute and processes them

// ========================================
// CONFIGURATION - Modify these as needed
// ========================================
const FORM_CONFIG = {
  // Worker URL
  workerUrl: "https://helix-form-worker-debug.revolv3.workers.dev/",

  // Form Selectors & Attributes
  formSelector: "form[cf-form]",
  formIdAttribute: "cf-form",
  formUrlAttribute: "cf-form-url",
  redirectUrlAttribute: "cf-redirect-url",

  // Submit Button Selectors
  submitButtonSelector: '[cf-form-submit="trigger"]',
  submitLabelSelector: '[cf-form-submit="button-label"]',

  // Error Handling Selectors
  errorElementSelector: '[cf-form-submit="error"]',
  errorTextSelector: '[cf-form-submit="error-text"]',

  // CSS Classes
  hideClass: "hide",

  // Loading Text
  loadingText: "Sending...",

  // Honeypot Settings
  enableHoneypot: true,
  honeypotFieldNames: [
    "honeypot_website",
    "honeypot_url",
    "honeypot_company_site",
    "honeypot_business_url",
    "bot_trap_website",
    "bot_trap_url",
    "spam_trap_site",
    "spam_trap_link",
  ], // Random selection - clearly identifiable as honeypot fields

  // Formspark Email Configuration
  emailConfig: {
    enabled: true,
    subjectAttribute: "cf-email-subject", // e.g., cf-email-subject="New Helix Contact Form: {{First-Name}} {{Last-Name}}"
    fromAttribute: "cf-email-from", // e.g., cf-email-from="{{Company}} Contact Form"
    titleAttribute: "cf-email-title", // e.g., cf-email-title="Contact from {{First-Name}}"
  },

  // Page URL Field
  pageUrlField: {
    enabled: true,
    fieldName: "Page URL", // The name attribute for the hidden field
  },

  // UTM/Tracking Parameter Persistence
  trackingParams: {
    enabled: true,
    allowPatterns: [/^utm_/i, /^gad_/i, /^gclid$/i, /^fbclid$/i], // Patterns for allowed parameters
    sessionStorageKey: "persistQS", // Key for sessionStorage
  },
};

class CloudflareFormHandler {
  constructor() {
    this.forms = [];
    this.workerUrl = FORM_CONFIG.workerUrl;
    this.initTrackingPersistence();
    this.init();
  }

  initTrackingPersistence() {
    if (!FORM_CONFIG.trackingParams.enabled) {
      return;
    }

    // Prevent duplicate initialization (similar to your existing script)
    if (window.__persistQS_init) return;
    window.__persistQS_init = true;

    console.log("Initializing tracking parameter persistence");

    // Helper function to check if a parameter is allowed
    const isAllowed = (key) => {
      return FORM_CONFIG.trackingParams.allowPatterns.some((pattern) =>
        pattern.test(key)
      );
    };

    // Filter and keep only allowed parameters
    const filterAllowed = (queryString) => {
      const src = new URLSearchParams(queryString);
      const out = new URLSearchParams();
      src.forEach((value, key) => {
        if (isAllowed(key)) {
          out.set(key, value);
        }
      });
      return out.toString();
    };

    // Get current URL parameters
    const incoming = window.location.search.slice(1);
    const filtered = filterAllowed(incoming);

    // Save filtered parameters to sessionStorage
    if (filtered) {
      sessionStorage.setItem(
        FORM_CONFIG.trackingParams.sessionStorageKey,
        filtered
      );
      console.log("Saved tracking parameters to sessionStorage:", filtered);
    }

    // Set up link parameter merging (for navigation)
    this.setupLinkParameterMerging();
  }

  setupLinkParameterMerging() {
    const persisted = sessionStorage.getItem(
      FORM_CONFIG.trackingParams.sessionStorageKey
    );
    if (!persisted) return;

    // Merge tracking params into a link without removing its own params
    const mergeQuery = (href) => {
      try {
        const url = new URL(href, window.location.origin);
        if (
          url.origin !== window.location.origin ||
          !/^https?:$/i.test(url.protocol)
        ) {
          return href;
        }

        const target = url.searchParams;
        const src = new URLSearchParams(persisted);

        src.forEach((val, key) => {
          if (!target.has(key)) {
            target.set(key, val);
          }
        });

        url.search = target.toString();
        return url.toString();
      } catch (e) {
        return href;
      }
    };

    // Find closest anchor element
    const closestAnchor = (el) => {
      while (el && el !== document && el.nodeType === 1) {
        if (el.tagName === "A" && el.hasAttribute("href")) return el;
        el = el.parentNode;
      }
      return null;
    };

    // Handle click events to merge parameters
    const handleClick = (ev) => {
      const a = closestAnchor(ev.target);
      if (!a) return;

      const href = a.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      )
        return;

      const merged = mergeQuery(href);
      if (merged !== href) {
        a.setAttribute("href", merged);
      }
    };

    // Add event listeners for link clicks
    document.addEventListener("click", handleClick, true);
    document.addEventListener("auxclick", handleClick, true);
  }

  init() {
    const start = () => this.setupForms();

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () =>
        this.waitForWebflow(start)
      );
    } else {
      this.waitForWebflow(start);
    }
  }

  waitForWebflow(callback) {
    // We want to run AFTER Webflow initializes but BEFORE their form handlers
    // So we'll use a short delay after Webflow is ready
    const runCallback = () => {
      // Small delay to let Webflow finish its initialization
      setTimeout(callback, 100);
    };

    if (window.Webflow && typeof window.Webflow.push === "function") {
      window.Webflow.push(runCallback);
      return;
    }

    if (Array.isArray(window.Webflow)) {
      window.Webflow.push(runCallback);
      return;
    }

    // Fallback: run with delay if Webflow isn't available
    setTimeout(callback, 100);
  }

  setupForms() {
    // Find all forms with cf-form attribute
    const formElements = document.querySelectorAll(FORM_CONFIG.formSelector);

    console.log(`Found ${formElements.length} forms with cf-form attribute`);

    formElements.forEach((formElement) => {
      console.log("Setting up form:", formElement.getAttribute("cf-form"));
      this.setupSingleForm(formElement);
    });
  }

  setupSingleForm(formElement) {
    // Extract configuration from custom attributes
    const config = {
      formId: formElement.getAttribute(FORM_CONFIG.formIdAttribute),
      formUrl: formElement.getAttribute(FORM_CONFIG.formUrlAttribute),
      redirectUrl: formElement.getAttribute(FORM_CONFIG.redirectUrlAttribute),
      formElement: formElement,
      submitButton: formElement.querySelector(FORM_CONFIG.submitButtonSelector),
      submitLabel: formElement.querySelector(FORM_CONFIG.submitLabelSelector),
      errorElement: formElement.querySelector(FORM_CONFIG.errorElementSelector),
      errorText: formElement.querySelector(FORM_CONFIG.errorTextSelector),
    };

    // Validate required attributes
    if (!config.formUrl) {
      console.warn(`Form ${config.formId} missing cf-form-url attribute`);
      return;
    }

    console.log(`Setting up form ${config.formId} with URL: ${config.formUrl}`);

    // Store form config
    this.forms.push(config);

    // Setup honeypot field
    this.setupHoneypot(config);

    // Setup Formspark email configuration
    this.setupEmailConfig(config);

    // Setup Page URL field
    this.setupPageUrlField(config);

    // Setup tracking parameters
    this.setupTrackingParams(config);

    // Setup Webflow intercept submission
    this.setupFormSubmission(config);
    this.setupAutoResetOnEdit(config);
  }

  setupHoneypot(config) {
    if (!FORM_CONFIG.enableHoneypot) {
      return;
    }

    // Check if honeypot already exists
    const existingHoneypot = config.formElement.querySelector(
      'input[data-honeypot="true"]'
    );
    if (existingHoneypot) {
      return;
    }

    // Create honeypot field with random name
    const randomFieldName =
      FORM_CONFIG.honeypotFieldNames[
        Math.floor(Math.random() * FORM_CONFIG.honeypotFieldNames.length)
      ];

    const honeypotField = document.createElement("input");
    honeypotField.type = "text";
    honeypotField.name = randomFieldName;
    honeypotField.setAttribute("data-honeypot", "true");
    honeypotField.setAttribute("tabindex", "-1");
    honeypotField.setAttribute("autocomplete", "off");

    // Make it invisible but accessible to screen readers
    honeypotField.style.cssText = `
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
        width: 1px !important;
        height: 1px !important;
        opacity: 0 !important;
        pointer-events: none !important;
      `;

    // Add aria-hidden for screen readers
    honeypotField.setAttribute("aria-hidden", "true");

    // Insert at the beginning of the form
    config.formElement.insertBefore(
      honeypotField,
      config.formElement.firstChild
    );
  }

  setupEmailConfig(config) {
    if (!FORM_CONFIG.emailConfig.enabled) {
      return;
    }

    // Check if email config fields already exist
    const existingEmailFields = config.formElement.querySelectorAll(
      'input[name^="_email."]'
    );
    if (existingEmailFields.length > 0) {
      return;
    }

    const emailFields = [];

    // Email Subject (with template variable support)
    const emailSubject = config.formElement.getAttribute(
      FORM_CONFIG.emailConfig.subjectAttribute
    );
    if (emailSubject) {
      emailFields.push({
        name: "_email.subject",
        value: emailSubject,
        hasTemplateVars: this.hasTemplateVariables(emailSubject),
      });
    }

    // Email From (Sender Name) (with template variable support)
    const emailFrom = config.formElement.getAttribute(
      FORM_CONFIG.emailConfig.fromAttribute
    );
    if (emailFrom) {
      emailFields.push({
        name: "_email.from",
        value: emailFrom,
        hasTemplateVars: this.hasTemplateVariables(emailFrom),
      });
    }

    // Email Template Title (with template variable support)
    const emailTitle = config.formElement.getAttribute(
      FORM_CONFIG.emailConfig.titleAttribute
    );
    if (emailTitle) {
      emailFields.push({
        name: "_email.template.title",
        value: emailTitle,
        hasTemplateVars: this.hasTemplateVariables(emailTitle),
      });
    }

    // Create and inject hidden fields
    emailFields.forEach((field) => {
      const hiddenField = document.createElement("input");
      hiddenField.type = "hidden";
      hiddenField.name = field.name;
      hiddenField.value = field.value;
      hiddenField.setAttribute("data-formspark-email", "true");

      // Insert at the beginning of the form (after honeypot if it exists)
      const honeypot = config.formElement.querySelector(
        'input[data-honeypot="true"]'
      );
      if (honeypot && honeypot.nextSibling) {
        config.formElement.insertBefore(hiddenField, honeypot.nextSibling);
      } else {
        config.formElement.insertBefore(
          hiddenField,
          config.formElement.firstChild
        );
      }
    });
  }

  setupPageUrlField(config) {
    if (!FORM_CONFIG.pageUrlField.enabled) {
      return;
    }

    // Check if Page URL field already exists
    const existingPageUrlField = config.formElement.querySelector(
      `input[name="${FORM_CONFIG.pageUrlField.fieldName}"]`
    );
    if (existingPageUrlField) {
      return;
    }

    // Create Page URL hidden field
    const pageUrlField = document.createElement("input");
    pageUrlField.type = "hidden";
    pageUrlField.name = FORM_CONFIG.pageUrlField.fieldName;
    pageUrlField.value = window.location.href;
    pageUrlField.setAttribute("data-page-url", "true");

    // Insert at the beginning of the form
    config.formElement.insertBefore(
      pageUrlField,
      config.formElement.firstChild
    );
  }

  setupTrackingParams(config) {
    if (!FORM_CONFIG.trackingParams.enabled) {
      return;
    }

    console.log("Setting up tracking parameters for form:", config.formId);

    // Get persisted tracking parameters from sessionStorage
    const persistedParams = sessionStorage.getItem(
      FORM_CONFIG.trackingParams.sessionStorageKey
    );

    if (!persistedParams) {
      console.log("No persisted tracking parameters found");
      return;
    }

    console.log("Found persisted tracking parameters:", persistedParams);

    // Parse the persisted parameters
    const urlParams = new URLSearchParams(persistedParams);
    const trackingFields = [];

    // Create hidden fields for each tracking parameter
    urlParams.forEach((value, key) => {
      // Check if this parameter matches our allowed patterns
      const isAllowed = FORM_CONFIG.trackingParams.allowPatterns.some(
        (pattern) => pattern.test(key)
      );

      if (isAllowed) {
        // Check if field already exists
        const existingField = config.formElement.querySelector(
          `input[name="${key}"]`
        );
        if (existingField) {
          console.log(`Tracking field ${key} already exists, skipping`);
          return;
        }

        // Create hidden field for this tracking parameter
        const trackingField = document.createElement("input");
        trackingField.type = "hidden";
        trackingField.name = key;
        trackingField.value = value;
        trackingField.setAttribute("data-tracking-param", "true");

        // Insert at the beginning of the form
        config.formElement.insertBefore(
          trackingField,
          config.formElement.firstChild
        );

        trackingFields.push({ key, value });
        console.log(`Added tracking parameter: ${key} = ${value}`);
      }
    });

    console.log(`Added ${trackingFields.length} tracking parameters to form`);
  }

  setupFormSubmission(config) {
    console.log(
      "Setting up form submission interception for form:",
      config.formId
    );

    // Completely disable Webflow's form handling
    config.formElement.removeAttribute("action");
    config.formElement.removeAttribute("method");
    config.formElement.setAttribute("data-wf-ignore", "true");

    // Store original form data for restoration if needed
    const originalAction = config.formElement.getAttribute("action");
    const originalMethod = config.formElement.getAttribute("method");

    // Add multiple event listeners to catch all submission attempts
    const handleSubmit = (event) => {
      console.log("Form submission intercepted:", event.type, event);

      // Always prevent default behavior
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      // Let native validation run first
      if (!config.formElement.checkValidity()) {
        console.log("Form validation failed, letting browser handle");
        config.formElement.reportValidity();
        return false;
      }

      // Check if reCAPTCHA is completed (Webflow's reCAPTCHA)
      const recaptchaResponse = config.formElement.querySelector(
        'textarea[name="g-recaptcha-response"]'
      );
      if (recaptchaResponse && !recaptchaResponse.value) {
        console.log("reCAPTCHA not completed, showing error");
        this.showError(config, "Please complete the reCAPTCHA verification.");
        return false;
      }

      console.log(
        "All validations passed, proceeding with custom form submission"
      );
      this.handleFormSubmit(config);
      return false;
    };

    // Add event listeners with capture phase to intercept early
    config.formElement.addEventListener("submit", handleSubmit, true);
    config.formElement.addEventListener("submit", handleSubmit, false);

    // Also intercept button clicks directly
    if (config.submitButton) {
      console.log("Setting up submit button interception");

      // Remove any existing Webflow click handlers by cloning the button
      const newButton = config.submitButton.cloneNode(true);
      config.submitButton.parentNode.replaceChild(
        newButton,
        config.submitButton
      );
      config.submitButton = newButton;

      config.submitButton.addEventListener(
        "click",
        (event) => {
          console.log("Submit button clicked, intercepting");
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();

          // Manually trigger form validation and submission
          if (config.formElement.checkValidity()) {
            // Check reCAPTCHA
            const recaptchaResponse = config.formElement.querySelector(
              'textarea[name="g-recaptcha-response"]'
            );
            if (recaptchaResponse && recaptchaResponse.value) {
              console.log(
                "Button click: all validations passed, proceeding with custom submission"
              );
              this.handleFormSubmit(config);
            } else {
              console.log("Button click: reCAPTCHA not completed");
              this.showError(
                config,
                "Please complete the reCAPTCHA verification."
              );
            }
          } else {
            console.log("Button click: form validation failed");
            config.formElement.reportValidity();
          }

          return false;
        },
        true
      );

      // Also add a regular event listener as backup
      config.submitButton.addEventListener(
        "click",
        (event) => {
          event.preventDefault();
          event.stopPropagation();
          return false;
        },
        false
      );
    }

    // Disable any Webflow form success/error handling
    const webflowDone =
      config.formElement.parentElement?.querySelector(".w-form-done");
    const webflowFail =
      config.formElement.parentElement?.querySelector(".w-form-fail");
    if (webflowDone) webflowDone.style.display = "none";
    if (webflowFail) webflowFail.style.display = "none";
  }

  setupAutoResetOnEdit(config) {
    // Auto-clear errors when user starts editing after an error
    // Track error state per form
    config.hasErrorShown = false;

    // Add input listeners to form fields
    const formInputs = config.formElement.querySelectorAll(
      "input, textarea, select"
    );
    formInputs.forEach((input) => {
      // Skip the honeypot inputs
      if (input.getAttribute("data-honeypot") === "true") {
        return;
      }

      // Clear errors when user starts editing
      input.addEventListener("input", () => {
        if (config.hasErrorShown) {
          this.hideError(config);
          config.hasErrorShown = false;
          console.log(
            `Auto-cleared error for form ${config.formId} after user started editing`
          );
        }
      });

      input.addEventListener("focus", () => {
        if (config.hasErrorShown) {
          this.hideError(config);
          config.hasErrorShown = false;
          console.log(
            `Auto-cleared error for form ${config.formId} after user focused on input`
          );
        }
      });
    });
  }

  async handleFormSubmit(config) {
    // Clear any previous errors
    this.hideError(config);

    // Set loading state
    this.setSubmitButtonLoading(config, true);

    try {
      // Collect form data
      const formData = this.collectFormData(config);

      // Add metadata for spam detection
      formData.metadata = {
        submissionTime: Date.now(),
        pageLoadTime: window.performance.timing.loadEventEnd,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        formId: config.formId,
      };

      const payload = {
        formData: formData,
        formUrl: config.formUrl, // Tell worker where to forward
        redirectUrl: config.redirectUrl,
      };

      // Submit to Cloudflare Worker
      const response = await fetch(this.workerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        this.handleSuccess(config);
      } else {
        this.showError(
          config,
          result.error?.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      this.showError(
        config,
        "Network error. Please check your connection and try again."
      );
    } finally {
      this.setSubmitButtonLoading(config, false);
    }
  }

  collectFormData(config) {
    const formData = {};
    const inputs = config.formElement.querySelectorAll(
      "input, textarea, select"
    );

    inputs.forEach((input) => {
      if (input.name && input.type !== "submit") {
        if (input.type === "checkbox") {
          formData[input.name] = input.checked;
        } else if (input.type === "radio") {
          if (input.checked) {
            formData[input.name] = input.value;
          }
        } else {
          formData[input.name] = input.value;
        }
      }
    });

    // Add honeypot detection metadata
    if (FORM_CONFIG.enableHoneypot) {
      const honeypotField = config.formElement.querySelector(
        'input[data-honeypot="true"]'
      );
      if (honeypotField) {
        formData._honeypot_field_name = honeypotField.name;
        formData._honeypot_filled = honeypotField.value !== "";
      }
    }

    // Convert Formspark email fields to nested object format
    this.convertEmailFieldsToNestedFormat(formData);

    return formData;
  }

  hasTemplateVariables(text) {
    return /\{\{[^}]+\}\}/.test(text);
  }

  processTemplateVariables(text, formData) {
    if (!this.hasTemplateVariables(text)) {
      return text;
    }

    return text.replace(/\{\{([^}]+)\}\}/g, (match, fieldId) => {
      const fieldValue = formData[fieldId.trim()];
      if (
        fieldValue !== undefined &&
        fieldValue !== null &&
        fieldValue !== ""
      ) {
        return fieldValue;
      } else {
        return match; // Keep original if field not found
      }
    });
  }

  convertEmailFieldsToNestedFormat(formData) {
    const emailConfig = {};
    const templateConfig = {};

    // Check for email configuration fields and convert them
    Object.keys(formData).forEach((key) => {
      if (key.startsWith("_email.")) {
        const value = formData[key];
        delete formData[key]; // Remove the flat field

        if (key === "_email.subject") {
          emailConfig.subject = this.processTemplateVariables(value, formData);
        } else if (key === "_email.from") {
          emailConfig.from = this.processTemplateVariables(value, formData);
        } else if (key === "_email.template.title") {
          templateConfig.title =
            value === "false"
              ? false
              : this.processTemplateVariables(value, formData);
        }
      }
    });

    // Add nested email object if we have email config
    if (
      Object.keys(emailConfig).length > 0 ||
      Object.keys(templateConfig).length > 0
    ) {
      formData._email = emailConfig;

      if (Object.keys(templateConfig).length > 0) {
        formData._email.template = templateConfig;
      }
    }
  }

  setSubmitButtonLoading(config, loading) {
    if (!config.submitButton) return;

    if (loading) {
      config.submitButton.disabled = true;
      if (config.submitLabel) {
        config.originalButtonText = config.submitLabel.innerHTML;
        config.submitLabel.innerHTML = FORM_CONFIG.loadingText;
      }
    } else {
      config.submitButton.disabled = false;
      if (config.submitLabel && config.originalButtonText) {
        config.submitLabel.innerHTML = config.originalButtonText;
      }
    }
  }

  showError(config, message) {
    // Use the configured error elements
    if (config.errorElement && config.errorText) {
      // Set the error message
      config.errorText.textContent = message;

      // Remove hide class to show error
      config.errorElement.classList.remove(FORM_CONFIG.hideClass);

      // Track that error has been shown for auto-clear functionality
      config.hasErrorShown = true;
    }
  }

  hideError(config) {
    // Use the configured error elements
    if (config.errorElement) {
      // Add hide class to hide error
      config.errorElement.classList.add(FORM_CONFIG.hideClass);

      // Reset error tracking flag
      config.hasErrorShown = false;
    }
  }

  handleSuccess(config) {
    // DON'T reset form - keep user's data visible
    // config.formElement.reset();

    // Prevent Webflow from hiding the form
    config.formElement.style.display = "block";
    config.formElement.style.visibility = "visible";

    // Also check parent containers
    let parent = config.formElement.parentElement;
    while (parent) {
      if (
        parent.classList &&
        (parent.classList.contains("w-form-done") ||
          parent.classList.contains("w-form-fail"))
      ) {
        parent.style.display = "none"; // Hide Webflow success/error states
      }
      parent = parent.parentElement;
    }

    // Redirect if specified (with a small delay to ensure form stays visible)
    if (config.redirectUrl) {
      const redirectUrl = this.buildRedirectUrl(config.redirectUrl);
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 100);
    }
  }

  buildRedirectUrl(redirectSlug) {
    // Get current origin (protocol + domain + port)
    const origin = window.location.origin;

    // Ensure slug starts with /
    const slug = redirectSlug.startsWith("/")
      ? redirectSlug
      : "/" + redirectSlug;

    return origin + slug;
  }
}

// Initialize when page loads and make it globally accessible for testing
const formSecurityHandler = new CloudflareFormHandler();
window.formSecurityHandler = formSecurityHandler;
window.turnstileHandler = formSecurityHandler; // Backwards compatibility

// Log helper message for developers
console.log(
  "Form Security Handler initialized. Webflow submissions will be intercepted and forwarded to the Cloudflare Worker."
);


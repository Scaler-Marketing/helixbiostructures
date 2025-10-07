// Cloudflare Turnstile Form Handler - Production Version
// Automatically detects forms with cf-form attribute and processes them

// ========================================
// CONFIGURATION - Modify these as needed
// ========================================
const FORM_CONFIG = {
  // Worker URL
  workerUrl: "https://helix-form-worker.revolv3.workers.dev/",

  // Form Selectors & Attributes
  formSelector: "form[cf-form]",
  formIdAttribute: "cf-form",
  siteKeyAttribute: "cf-turnstile-sitekey",
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
  turnstileContainerClass: "cf-turnstile-container",

  // Turnstile Settings
  turnstileTheme: "light",
  turnstileSize: "normal",

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
};

class CloudflareTurnstileHandler {
  constructor() {
    this.forms = [];
    this.workerUrl = FORM_CONFIG.workerUrl;
    this.init();
  }

  init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setupForms());
    } else {
      this.setupForms();
    }
  }

  setupForms() {
    // Find all forms with cf-form attribute
    const formElements = document.querySelectorAll(FORM_CONFIG.formSelector);

    formElements.forEach((formElement) => {
      this.setupSingleForm(formElement);
    });
  }

  setupSingleForm(formElement) {
    // Extract configuration from custom attributes
    const config = {
      formId: formElement.getAttribute(FORM_CONFIG.formIdAttribute),
      siteKey: formElement.getAttribute(FORM_CONFIG.siteKeyAttribute),
      formUrl: formElement.getAttribute(FORM_CONFIG.formUrlAttribute),
      redirectUrl: formElement.getAttribute(FORM_CONFIG.redirectUrlAttribute),
      formElement: formElement,
      submitButton: formElement.querySelector(FORM_CONFIG.submitButtonSelector),
      submitLabel: formElement.querySelector(FORM_CONFIG.submitLabelSelector),
      errorElement: formElement.querySelector(FORM_CONFIG.errorElementSelector),
      errorText: formElement.querySelector(FORM_CONFIG.errorTextSelector),
      turnstileToken: null,
    };

    // Validate required attributes
    if (!config.siteKey || !config.formUrl) {
      return;
    }

    // Store form config
    this.forms.push(config);

    // Setup honeypot field
    this.setupHoneypot(config);

    // Setup Formspark email configuration
    this.setupEmailConfig(config);

    // Setup Page URL field
    this.setupPageUrlField(config);

    // Setup Turnstile and form submission
    this.loadTurnstile(() => this.renderTurnstile(config));
    this.setupFormSubmission(config);
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

  loadTurnstile(callback) {
    if (!window.turnstile) {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.onload = callback;
      document.head.appendChild(script);
    } else {
      callback();
    }
  }

  renderTurnstile(config) {
    // Create container for Turnstile widget
    let turnstileContainer = config.formElement.querySelector(
      `.${FORM_CONFIG.turnstileContainerClass}`
    );
    if (!turnstileContainer) {
      turnstileContainer = document.createElement("div");
      turnstileContainer.className = FORM_CONFIG.turnstileContainerClass;
      turnstileContainer.style.marginBottom = "20px";

      // Insert before submit button
      config.submitButton.parentNode.insertBefore(
        turnstileContainer,
        config.submitButton
      );
    }

    // Render Turnstile widget
    window.turnstile.render(turnstileContainer, {
      sitekey: config.siteKey,
      callback: (token) => {
        config.turnstileToken = token;
        this.enableSubmitButton(config);
      },
      "error-callback": () => {
        config.turnstileToken = null;
        this.disableSubmitButton(config);
        this.showError(
          config,
          "Security verification failed. Please try again."
        );
      },
      "expired-callback": () => {
        config.turnstileToken = null;
        this.disableSubmitButton(config);
      },
      theme: FORM_CONFIG.turnstileTheme,
      size: FORM_CONFIG.turnstileSize,
    });

    // Initially disable submit button
    this.disableSubmitButton(config);
  }

  setupFormSubmission(config) {
    config.formElement.addEventListener("submit", (e) => {
      // Let native validation run first
      if (!config.formElement.checkValidity()) {
        return; // Let browser show validation errors
      }

      // Form is valid, now intercept
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      this.handleFormSubmit(config);
    });

    // Also prevent any other form submission events
    config.formElement.addEventListener(
      "submit",
      (e) => {
        e.preventDefault();
      },
      true
    ); // Use capture phase
  }

  async handleFormSubmit(config) {
    // Clear any previous errors
    this.hideError(config);

    // Validate Turnstile token
    if (!config.turnstileToken) {
      this.showError(config, "Please complete the security verification.");
      return;
    }

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
        turnstileToken: config.turnstileToken,
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
        // Reset Turnstile on error to generate new token
        this.resetTurnstileOnError(config);

        this.showError(
          config,
          result.error?.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      // Reset Turnstile on error to generate new token
      this.resetTurnstileOnError(config);

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

  resetTurnstileOnError(config) {
    if (window.turnstile) {
      // Reset the Turnstile widget to generate a new token
      window.turnstile.reset();

      // Clear the current token and disable submit button
      config.turnstileToken = null;
      this.disableSubmitButton(config);
    }
  }

  enableSubmitButton(config) {
    if (config.submitButton) {
      config.submitButton.disabled = false;
      config.submitButton.style.opacity = "1";
    }
  }

  disableSubmitButton(config) {
    if (config.submitButton) {
      config.submitButton.disabled = true;
      config.submitButton.style.opacity = "0.6";
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
    }
  }

  hideError(config) {
    // Use the configured error elements
    if (config.errorElement) {
      // Add hide class to hide error
      config.errorElement.classList.add(FORM_CONFIG.hideClass);
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

    // Reset Turnstile
    if (window.turnstile) {
      window.turnstile.reset();
    }
    config.turnstileToken = null;
    this.disableSubmitButton(config);

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

// Initialize when page loads
new CloudflareTurnstileHandler();

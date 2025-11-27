import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, Mail, GraduationCap, Briefcase, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    qualification: "",
    experience: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Keep submitted values so success overlay can show them after clearing the form
  const [submittedName, setSubmittedName] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  // Vite exposes env vars through import.meta.env (VITE_ prefix)
  const API_BASE =
    (import.meta.env.VITE_API_BASE_URL as string) ||
    (import.meta.env.VITE_REACT_APP_API_BASE_URL as string) ||
    "https://api.gep.globalmindsindia.in";

  // --- Helpers / validators ---
  const sanitizeNameInput = (value: string) => {
    // Allow letters, spaces, hyphen, apostrophe, dot. Remove digits and other special chars.
    return value.replace(/[^A-Za-z\s\-\.'\u00C0-\u024f]/g, "");
  };

  const sanitizeMobileInput = (value: string) => {
    // keep digits only and limit to 10
    const digits = value.replace(/\D/g, "").slice(0, 10);
    return digits;
  };

  const hasTooManyConsecutiveSameDigits = (numStr: string) => {
    // detects 5 or more repeated consecutive digits (disallowed)
    return /(\d)\1{4,}/.test(numStr);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name: required, no digits, length > 3
    const nameTrim = formData.name.trim();
    if (!nameTrim) {
      newErrors.name = "Name is required";
    } else if (nameTrim.length <= 3) {
      newErrors.name = "Name must be more than 3 characters";
    }

    // Mobile: required, exactly 10 digits, starts with 6-9, no 5+ consecutive same digits
    const mobileRaw = formData.mobile.replace(/\s/g, "");
    if (!mobileRaw) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(mobileRaw)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number starting with 6,7,8 or 9";
    } else if (hasTooManyConsecutiveSameDigits(mobileRaw)) {
      newErrors.mobile = "Mobile number must not contain more than 4 consecutive identical digits";
    }

    // Email: basic check
    const emailTrim = formData.email.trim();
    if (!emailTrim) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Qualification: required, basic min length
    const qualTrim = formData.qualification.trim();
    if (!qualTrim) {
      newErrors.qualification = "Qualification is required";
    } else if (qualTrim.length < 2) {
      newErrors.qualification = "Please provide a valid qualification";
    }

    // Experience: required, basic min length (and example placeholder guides the user)
    const expTrim = formData.experience.trim();
    if (!expTrim) {
      newErrors.experience = "Experience details are required";
    } else if (expTrim.length < 10) {
      newErrors.experience = "Please provide more detail about your experience (min 10 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Map pydantic validation errors to field names
  const mapPydanticErrorsToFields = (details: any[]): Record<string, string> => {
    const mapped: Record<string, string> = {};
    details.forEach((err: any) => {
      let field = String(err?.loc?.[0] ?? "");
      if (Array.isArray(err.loc) && err.loc.length > 1) {
        field = err.loc[0] === "extra" ? String(err.loc[1]) : String(err.loc[err.loc.length - 1]);
      }
      if (!field) field = "form";
      mapped[field] = err.msg ?? "Invalid value";
    });
    return mapped;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // client-side validation
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setIsSuccess(false);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      extra: {
        // backend expects 10-digit number (we keep it that way)
        mobile: formData.mobile.trim(),
        qualification: formData.qualification.trim(),
        experience: formData.experience.trim(),
      },
    };

    try {
      const res = await fetch(`${API_BASE.replace(/\/$/, "")}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        // Save submitted values for the success overlay before clearing
        setSubmittedName(payload.name);
        // show email in overlay (submittedEmail)
        setSubmittedEmail(payload.email);

        setIsSuccess(true);

        // clear form
        setFormData({ name: "", mobile: "", email: "", qualification: "", experience: "" });
        setIsSubmitting(false);
        return;
      }

      // 422 - pydantic validation errors (detail = list)
      if (res.status === 422 && data?.detail && Array.isArray(data.detail)) {
        const mapped = mapPydanticErrorsToFields(data.detail);
        setErrors((prev) => ({ ...prev, ...mapped }));
        setIsSubmitting(false);
        return;
      }

      // 409 - duplicate email
      if (res.status === 409) {
        setErrors({ ...errors, email: data?.detail ?? "Email already registered" });
        setIsSubmitting(false);
        return;
      }

      // Generic server or other status
      setErrors({ form: data?.detail ?? `Registration failed (status ${res.status})` });
    } catch (err: any) {
      console.error("Network error analyzing registration:", err);
      setErrors({ form: err.message || "Network error during registration" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Input change handler with per-field sanitization
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "name") {
      const sanitized = sanitizeNameInput(value);
      setFormData((prev) => ({ ...prev, name: sanitized }));
      if (errors.name) {
        setErrors((prev) => ({ ...prev, name: "" }));
      }
      return;
    }

    if (name === "mobile") {
      const sanitized = sanitizeMobileInput(value);
      setFormData((prev) => ({ ...prev, mobile: sanitized }));
      if (errors.mobile) {
        setErrors((prev) => ({ ...prev, mobile: "" }));
      }
      return;
    }

    // For other fields (email, qualification, experience)
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl pointer-events-auto relative"
            >
              {/* Success overlay */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-green-500 rounded-3xl flex items-center justify-center z-10 p-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="text-center text-white max-w-md"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 0.6 }}
                        className="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center"
                      >
                        <Sparkles className="w-10 h-10 text-green-500" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-4">Thank you, {submittedName || "Partner"}, for registering!</h3>
                      <div className="space-y-4 text-white/90">
                        <p className="text-lg font-medium">We're excited to have you onboard.</p>
                        <p className="text-base">Your registration details have been successfully received.</p>
                        <div className="bg-white/10 rounded-lg p-3 text-center">
                          <p className="text-base font-medium mb-1">📧 A confirmation email has been sent to:</p>
                          <p className="text-sm font-semibold">{submittedEmail}</p>
                          <p className="text-sm mt-1">Please check your inbox (and spam folder) for the next steps.</p>
                        </div>
                        <p className="text-base leading-relaxed">
                          Our team will get in touch with you shortly for further assistance.
                        </p>
                        <Button
                          onClick={() => {
                            // reset success state and close
                            setSubmittedName("");
                            setSubmittedEmail("");
                            setIsSuccess(false);
                            onClose();
                            window.location.href = "/";
                          }}
                          className="bg-white text-green-500 hover:bg-white/90 font-semibold px-6 py-2 rounded-full mt-4"
                        >
                          Back to Home
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Header */}
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-t-3xl">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <div className="text-center text-white">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                  >
                    <GraduationCap className="w-8 h-8" />
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-2">Join GEP Programme</h2>
                  <p className="text-white/90">Start your journey as an education partner</p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* non-field (form) error */}
                {errors.form && (
                  <div className="text-center text-red-600 mb-2">{errors.form}</div>
                )}

                {/* Name */}
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2 mb-2 text-gray-700">
                    <User className="w-4 h-4" />
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={errors.name ? "border-red-500" : ""}
                    aria-invalid={!!errors.name}
                    onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => {
                      const paste = e.clipboardData?.getData("text") ?? "";
                      const sanitized = sanitizeNameInput(paste);
                      if (sanitized !== paste) {
                        e.preventDefault();
                        const el = e.target as HTMLInputElement;
                        const newVal = (el.value + sanitized).slice(0, 200);
                        setFormData((prev) => ({ ...prev, name: newVal }));
                        if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                      }
                    }}
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Mobile with +91 prefix */}
                <div>
                  <Label htmlFor="mobile" className="flex items-center gap-2 mb-2 text-gray-700">
                    <Phone className="w-4 h-4" />
                    Mobile Number *
                  </Label>

                  <div className="flex items-center gap-2">
                    {/* non-editable prefix */}
                    <span
                      className="inline-flex items-center px-3 py-2 rounded-lg bg-gray-100 text-gray-700 border border-r-0"
                      aria-hidden
                    >
                      +91
                    </span>

                    {/* input — only the 10-digit number is editable */}
                    <Input
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter your 10-digit mobile number"
                      className={`${errors.mobile ? "border-red-500" : ""} flex-1 rounded-l-none`}
                      aria-invalid={!!errors.mobile}
                      inputMode="numeric"
                      aria-label="Mobile number without country code"
                      aria-describedby="mobile-help"
                      // block non-digit key presses
                      onKeyDown={(e) => {
                        // allow control keys
                        if (
                          e.key === "Backspace" ||
                          e.key === "Delete" ||
                          e.key === "ArrowLeft" ||
                          e.key === "ArrowRight" ||
                          e.key === "Tab"
                        ) {
                          return;
                        }
                        // prevent non-digit entry
                        if (!/^\d$/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      onBlur={() => {
                        if (formData.mobile && formData.mobile.length < 10) {
                          setErrors((prev) => ({ ...prev, mobile: "Mobile number must be 10 digits" }));
                        }
                      }}
                      onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => {
                        const paste = e.clipboardData?.getData("text") ?? "";
                        const sanitized = sanitizeMobileInput(paste);
                        if (sanitized !== paste) {
                          e.preventDefault();
                          const el = e.target as HTMLInputElement;
                          const newVal = (el.value + sanitized).slice(0, 10);
                          setFormData((prev) => ({ ...prev, mobile: newVal }));
                          if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: "" }));
                        } else {
                          // If paste is already digits, still sanitize & limit
                          const el = e.target as HTMLInputElement;
                          const newVal = (el.value + sanitized).slice(0, 10);
                          e.preventDefault();
                          setFormData((prev) => ({ ...prev, mobile: newVal }));
                          if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: "" }));
                        }
                      }}
                    />
                  </div>

                  {errors.mobile && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.mobile}
                    </motion.p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 mb-2 text-gray-700">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className={errors.email ? "border-red-500" : ""}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                {/* Qualification */}
                <div>
                  <Label htmlFor="qualification" className="flex items-center gap-2 mb-2 text-gray-700">
                    <GraduationCap className="w-4 h-4" />
                    Qualification *
                  </Label>
                  <Input
                    id="qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    placeholder="E.g., MBA, B.Tech, M.A."
                    className={errors.qualification ? "border-red-500" : ""}
                    aria-invalid={!!errors.qualification}
                  />
                  {errors.qualification && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.qualification}
                    </motion.p>
                  )}
                </div>

                {/* Experience */}
                <div>
                  <Label htmlFor="experience" className="flex items-center gap-2 mb-2 text-gray-700">
                    <Briefcase className="w-4 h-4" />
                    Experience *
                  </Label>
                  <Textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="E.g., 3 years at ABC University as Admissions Counselor — handled partnerships, outreach, and onboarding."
                    rows={4}
                    className={errors.experience ? "border-red-500" : ""}
                    aria-invalid={!!errors.experience}
                  />
                  {errors.experience && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.experience}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg font-semibold rounded-xl"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Submitting...
                    </span>
                  ) : (
                    "Submit Registration"
                  )}
                </Button>

                <p className="text-center text-sm text-gray-500">
                  By submitting, you agree to our terms and conditions
                </p>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

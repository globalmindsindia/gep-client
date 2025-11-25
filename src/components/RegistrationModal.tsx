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

  // Vite exposes env vars through import.meta.env (VITE_ prefix)
  // Prefer explicit Vite env variable; fallback to production API when not set
  // NOTE: Set VITE_API_BASE_URL in your dev .env if you want to override during local testing
  const API_BASE =
    (import.meta.env.VITE_API_BASE_URL as string) ||
    (import.meta.env.VITE_REACT_APP_API_BASE_URL as string) ||
    "https://api.gep.globalmindsindia.in";

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile.replace(/\s/g, ""))) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.qualification.trim()) {
      newErrors.qualification = "Qualification is required";
    }

    if (!formData.experience.trim()) {
      newErrors.experience = "Experience details are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Map pydantic validation errors to field names
  const mapPydanticErrorsToFields = (details: any[]): Record<string, string> => {
    const mapped: Record<string, string> = {};
    details.forEach((err: any) => {
      // Err.loc is usually ["extra", "mobile"] or ["email"] etc.
      let field = String(err?.loc?.[0] ?? "");
      if (Array.isArray(err.loc) && err.loc.length > 1) {
        // prefer the second segment if first is `extra`
        field = err.loc[0] === "extra" ? String(err.loc[1]) : String(err.loc[err.loc.length - 1]);
      }
      // Finally fallback to 'form' if unknown
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
        // if your backend uses cookies/session auth, add credentials: 'include'
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        setIsSuccess(true);
        // Optionally clear form here or after the user confirms
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
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
                      <h3 className="text-2xl font-bold mb-4">Thank you, {formData.name}, for registering!</h3>
                      <div className="space-y-4 text-white/90">
                        <p className="text-lg font-medium">We're excited to have you onboard.</p>
                        <p className="text-base">Your registration details have been successfully received.</p>
                        <div className="bg-white/10 rounded-lg p-3 text-center">
                          <p className="text-base font-medium mb-1">📧 A confirmation email has been sent to:</p>
                          <p className="text-sm font-semibold">{formData.email}</p>
                          <p className="text-sm mt-1">Please check your inbox (and spam folder) for the next steps.</p>
                        </div>
                        <p className="text-base leading-relaxed">
                          Our team will get in touch with you shortly for further assistance.
                        </p>
                        <Button
                          onClick={() => {
                            setFormData({
                              name: "",
                              mobile: "",
                              email: "",
                              qualification: "",
                              experience: "",
                            });
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

                {/* Mobile */}
                <div>
                  <Label htmlFor="mobile" className="flex items-center gap-2 mb-2 text-gray-700">
                    <Phone className="w-4 h-4" />
                    Mobile Number *
                  </Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    className={errors.mobile ? "border-red-500" : ""}
                    aria-invalid={!!errors.mobile}
                  />
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
                    placeholder="Tell us about your relevant experience"
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
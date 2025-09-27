"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, CheckCircle, ArrowRight, User, Mail, MessageSquare } from "lucide-react"
import Link from "next/link"

const servicePackages = [
  {
    id: "mvp",
    name: "MVP Development",
    price: "$5,000",
    duration: "2-3 weeks",
    description: "Perfect for validating your idea with a functional prototype",
    features: [
      "Full-stack web application",
      "Modern UI/UX design",
      "Database integration",
      "Authentication system",
      "Responsive design",
      "Basic analytics",
      "2 rounds of revisions",
    ],
    popular: false,
  },
  {
    id: "full-product",
    name: "Full Product Development",
    price: "$15,000",
    duration: "4-6 weeks",
    description: "Complete product development from concept to launch",
    features: [
      "Everything in MVP",
      "Advanced features & integrations",
      "Payment processing",
      "Admin dashboard",
      "API development",
      "Performance optimization",
      "SEO optimization",
      "Deployment & hosting setup",
      "3 months support",
    ],
    popular: true,
  },
  {
    id: "consulting",
    name: "Technical Consulting",
    price: "$200/hour",
    duration: "Flexible",
    description: "Strategic guidance and technical expertise for your project",
    features: [
      "Architecture review",
      "Technology recommendations",
      "Code review & optimization",
      "Team mentoring",
      "Project planning",
      "Technical documentation",
      "Minimum 4-hour blocks",
    ],
    popular: false,
  },
]

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]

export default function ServicesPage() {
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectDescription: "",
    budget: "",
    timeline: "",
  })
  const [currentStep, setCurrentStep] = useState(1)

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would submit to your booking system
    alert("Booking request submitted! You'll receive a confirmation email shortly.")
  }

  const selectedPackageData = servicePackages.find((pkg) => pkg.id === selectedPackage)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 text-foreground hover:text-accent transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">AnchorMarianas</span>
            </Link>
            <div className="text-sm text-muted-foreground">Services & Booking</div>
          </div>
        </div>
      </nav>

      <div className="pt-20">
        {/* Header */}
        <section className="py-12 px-6 border-b border-border">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4">Let's Build Something Amazing</h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Choose the perfect service package for your project and schedule a discovery call to get started on your
              digital transformation.
            </p>
          </div>
        </section>

        {currentStep === 1 && (
          <section className="py-12 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold mb-4">Choose Your Service Package</h2>
                <p className="text-muted-foreground">Select the option that best fits your project needs</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {servicePackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`relative bg-card rounded-2xl border-2 p-8 cursor-pointer transition-all duration-300 ${
                      selectedPackage === pkg.id
                        ? "border-accent shadow-lg scale-105"
                        : "border-border hover:border-accent/50 hover:shadow-md"
                    } ${pkg.popular ? "ring-2 ring-accent/20" : ""}`}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    {pkg.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-accent-foreground">
                        Most Popular
                      </Badge>
                    )}

                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                      <div className="text-3xl font-bold text-accent mb-1">{pkg.price}</div>
                      <div className="text-sm text-muted-foreground">{pkg.duration}</div>
                    </div>

                    <p className="text-muted-foreground text-sm text-center mb-6 text-pretty">{pkg.description}</p>

                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${
                        selectedPackage === pkg.id
                          ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                          : "bg-muted hover:bg-muted/80 text-muted-foreground"
                      }`}
                    >
                      {selectedPackage === pkg.id ? "Selected" : "Select Package"}
                    </Button>
                  </div>
                ))}
              </div>

              {selectedPackage && (
                <div className="text-center mt-12">
                  <Button
                    size="lg"
                    onClick={handleNext}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Continue to Scheduling
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </section>
        )}

        {currentStep === 2 && selectedPackageData && (
          <section className="py-12 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold mb-4">Schedule Your Discovery Call</h2>
                <p className="text-muted-foreground">
                  Selected: <span className="font-semibold text-foreground">{selectedPackageData.name}</span> -{" "}
                  {selectedPackageData.price}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                {/* Calendar */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Select Date
                  </h3>

                  <div className="grid grid-cols-7 gap-2 text-center text-sm">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="font-semibold text-muted-foreground p-2">
                        {day}
                      </div>
                    ))}

                    {/* Sample calendar dates */}
                    {Array.from({ length: 35 }, (_, i) => {
                      const date = new Date()
                      date.setDate(date.getDate() + i - 7)
                      const dateStr = date.toISOString().split("T")[0]
                      const isToday = i === 7
                      const isPast = i < 7
                      const isWeekend = date.getDay() === 0 || date.getDay() === 6

                      return (
                        <button
                          key={i}
                          disabled={isPast || isWeekend}
                          onClick={() => setSelectedDate(dateStr)}
                          className={`p-2 rounded-lg text-sm transition-colors ${
                            selectedDate === dateStr
                              ? "bg-accent text-accent-foreground"
                              : isPast || isWeekend
                                ? "text-muted-foreground cursor-not-allowed"
                                : "hover:bg-muted"
                          } ${isToday ? "ring-2 ring-accent/50" : ""}`}
                        >
                          {date.getDate()}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Select Time (EST)
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                          selectedTime === time
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted hover:bg-muted/80 text-muted-foreground"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {selectedDate && selectedTime && (
                <div className="text-center mt-12">
                  <div className="bg-muted/50 rounded-lg p-6 mb-6 max-w-md mx-auto">
                    <h4 className="font-semibold mb-2">Booking Summary</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedPackageData.name} Discovery Call
                      <br />
                      {new Date(selectedDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      at {selectedTime}
                    </p>
                  </div>

                  <Button
                    size="lg"
                    onClick={handleNext}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Continue to Details
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </section>
        )}

        {currentStep === 3 && (
          <section className="py-12 px-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold mb-4">Tell Us About Your Project</h2>
                <p className="text-muted-foreground">
                  Help us prepare for our discovery call by sharing some details about your project
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name *
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Company/Organization</label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Inc."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Project Description *
                  </label>
                  <Textarea
                    required
                    rows={4}
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Budget Range</label>
                    <select
                      className="w-full p-3 rounded-lg border border-border bg-background"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    >
                      <option value="">Select budget range</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k+">$50,000+</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Timeline</label>
                    <select
                      className="w-full p-3 rounded-lg border border-border bg-background"
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1-2months">1-2 months</option>
                      <option value="3-6months">3-6 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-6">
                  <h4 className="font-semibold mb-4">Booking Confirmation</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">Service:</span> {selectedPackageData?.name}
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Date:</span>{" "}
                      {new Date(selectedDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Time:</span> {selectedTime} EST
                    </p>
                    <p>
                      <span className="font-medium text-foreground">Duration:</span> 30 minutes
                    </p>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Calendar className="w-5 h-5 mr-2" />
                  Confirm Booking
                </Button>
              </form>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
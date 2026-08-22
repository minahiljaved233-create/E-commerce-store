import { useState } from "react"
import { Link } from "react-router-dom"
import "./Account.css"

function Account() {
  const savedProfile =
    JSON.parse(localStorage.getItem("profile")) || {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
    }

  const [profile, setProfile] = useState(savedProfile)
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    })

    setSaved(false)
  }

  const handleSave = (e) => {
    e.preventDefault()

    localStorage.setItem(
      "profile",
      JSON.stringify(profile)
    )

    setSaved(true)
  }

  return (
    <section className="account">

      <div className="account-header">
        <span>MY ACCOUNT</span>

        <h1>Profile Settings</h1>

        <p>
          Manage your personal information and
          delivery details.
        </p>
      </div>


      <div className="account-container">

        <div className="account-card">

          <div className="account-avatar">
            👤
          </div>

          <h2>
            {profile.name || "Your Name"}
          </h2>

          <p>
            {profile.email || "Add your email address"}
          </p>

        </div>


        <form
          className="profile-form"
          onSubmit={handleSave}
        >

          <div className="profile-section">

            <h2>Personal Information</h2>

            <div className="form-group">

              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={profile.name}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={profile.email}
                onChange={handleChange}
              />

            </div>


            <div className="form-group">

              <label>Phone Number</label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={profile.phone}
                onChange={handleChange}
              />

            </div>

          </div>


          <div className="profile-section">

            <h2>Delivery Address</h2>

            <div className="form-group">

              <label>Address</label>

              <textarea
                name="address"
                placeholder="House number, street, area"
                value={profile.address}
                onChange={handleChange}
              />

            </div>


            <div className="profile-row">

              <div className="form-group">

                <label>City</label>

                <input
                  type="text"
                  name="city"
                  placeholder="Your city"
                  value={profile.city}
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label>Country</label>

                <input
                  type="text"
                  name="country"
                  placeholder="Your country"
                  value={profile.country}
                  onChange={handleChange}
                />

              </div>

            </div>

          </div>


          <button
            type="submit"
            className="save-profile-btn"
          >
            Save Changes
          </button>


          {saved && (
            <p className="profile-saved">
              ✓ Profile saved successfully!
            </p>
          )}

        </form>

      </div>


      <div className="account-links">

        <Link to="/orders">
          📦 My Orders
        </Link>

        <Link to="/wishlist">
          ♡ My Wishlist
        </Link>

      </div>

    </section>
  )
}

export default Account
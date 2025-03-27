# GlowLink
A decentralized skincare routine recommendation system based on weather conditions and skin types.

## Features
- Register user skin profiles
- Add/update skincare routines
- Get personalized routine recommendations based on weather conditions
- Rate and review routines
- Share routines with other users

## Setup and Installation
1. Clone the repository
2. Install Clarinet (if not already installed)
3. Run `clarinet check` to verify the contract
4. Run `clarinet test` to run the test suite

## Usage Examples
```clarity
;; Register user skin profile
(contract-call? .glow-link register-profile "oily" "sensitive" "none")

;; Add skincare routine
(contract-call? .glow-link add-routine "Summer Glow" "morning" "sunny" {steps: "Cleanser,Toner,Moisturizer"})

;; Get recommended routine
(contract-call? .glow-link get-recommendation "sunny" "morning")
```

## Dependencies
- Clarity language
- Clarinet for testing and deployment

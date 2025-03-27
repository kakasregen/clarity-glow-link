;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-not-found (err u100))
(define-constant err-unauthorized (err u101))
(define-constant err-invalid-data (err u102))

;; Data variables
(define-map user-profiles
  principal
  {
    skin-type: (string-ascii 20),
    skin-concerns: (string-ascii 20),
    allergies: (string-ascii 100)
  }
)

(define-map skincare-routines
  uint
  {
    name: (string-ascii 50),
    time: (string-ascii 10),
    weather: (string-ascii 10),
    steps: (string-ascii 200),
    creator: principal,
    rating: uint
  }
)

(define-data-var routine-counter uint u0)

;; Public functions
(define-public (register-profile (skin-type (string-ascii 20)) 
                               (skin-concerns (string-ascii 20))
                               (allergies (string-ascii 100)))
  (ok (map-set user-profiles tx-sender
    {
      skin-type: skin-type,
      skin-concerns: skin-concerns,
      allergies: allergies
    }))
)

(define-public (add-routine (name (string-ascii 50))
                           (time (string-ascii 10))
                           (weather (string-ascii 10))
                           (steps (string-ascii 200)))
  (let
    ((routine-id (var-get routine-counter)))
    (begin
      (map-set skincare-routines routine-id
        {
          name: name,
          time: time,
          weather: weather,
          steps: steps,
          creator: tx-sender,
          rating: u0
        })
      (var-set routine-counter (+ routine-id u1))
      (ok routine-id)))
)

(define-public (rate-routine (routine-id uint) (rating uint))
  (let ((routine (unwrap! (map-get? skincare-routines routine-id) err-not-found)))
    (if (and (>= rating u0) (<= rating u5))
      (ok (map-set skincare-routines routine-id
        (merge routine { rating: rating })))
      err-invalid-data))
)

;; Read only functions
(define-read-only (get-profile (user principal))
  (ok (map-get? user-profiles user))
)

(define-read-only (get-routine (routine-id uint))
  (ok (map-get? skincare-routines routine-id))
)

(define-read-only (get-recommendation (weather (string-ascii 10)) (time (string-ascii 10)))
  (ok (map-get? skincare-routines u0))
)

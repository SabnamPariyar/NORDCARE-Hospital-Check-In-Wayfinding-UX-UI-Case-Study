# NORDCARE

### A calmer way through care.

**Family-first hospital self-service check-in · Patient journey UX/UI · Service design**

NORDCARE is an independent, research-led concept exploring how a hospital visit can feel clearer from the first step: arriving, identifying an appointment, checking in, receiving a queue number and finding the right waiting area.

**[Explore the interactive prototype](https://sabnampariyar.github.io/NORDCARE-Hospital-Check-In-Wayfinding-UX-UI-Case-Study/)**

> Concept project for Sabnam Pariyar's UX/UI and service design portfolio. It is not affiliated with a hospital or public healthcare authority, and does not register real patients.

---

## The design challenge

Hospital arrivals often involve multiple interfaces and physical spaces: the entrance, check-in, registration exceptions, signage, queue displays and waiting rooms. The concept asks:

**What if arrival felt like one guided service, rather than a collection of separate tasks?**

### Two connected journeys

| Adult patient | Guardian with child |
| --- | --- |
| Choose language and check-in method | See calm, child-friendly wording and guidance |
| Simulate Kela card or appointment QR scan | Follow a guardian-accompanied simulated check-in |
| Review a fictional appointment | Review a fictional pediatric appointment |
| Receive an example queue number | Receive an example queue number |
| View a route to waiting area A | View a route to waiting area C |

Both paths include a visible route to reception staff.

## What you can explore

- **Interactive kiosk:** complete simulated patient and family journeys, not just visual mockups.
- **International benchmark:** documented practices from Finland, the UK, US, Singapore and Australia.
- **Service blueprint:** patient-facing, staff-facing, backstage and support layers.
- **Design system:** color, typography, touch components and child-friendly illustration.
- **Inclusive features:** Finnish / Swedish / English, larger text, contrast control, step-free route and reduced-motion support.
- **Ambient visual:** Three.js fragment shader behind animated SVG wayfinding artwork, with a CSS/SVG fallback where WebGL is unavailable.
- **Three-floor indoor wayfinding:** selectable architectural floor diagrams for entrance/diagnostics, family clinics, and treatment/therapy, with rooms, wings, corridor intersections, aligned lifts and stairs, entrances, and clear destination markers.
- **Connected route model:** the highlighted SVG path is computed from the same walkway graph that defines the displayed corridors. A family visit crosses floors via a lift or stairs, and the directions switch with the accessibility option. The map can be enlarged or printed with the relevant floor legs.

### Mapping accuracy: concept versus deployment

The NORDCARE building is **fictional**. Floors, rooms, departments, coordinates and routes are deliberately invented for demonstration, and the map visibly says it is not to scale. It must not be used to direct patients at a real hospital.

To make a real wayfinding system, the location graph would need to be generated or verified against **approved hospital CAD/BIM drawings or surveyed floor plans**, then validated on site. Each destination needs a canonical room/department identifier, public-entry permissions, corridor connectivity, lift and staircase access, accessible route constraints, signage names, temporary closures and an explicit update process. All patient routes would need safety and usability testing with hospital staff before release.

The shader is intentionally separate from navigation. Animated route strokes are restrained SVG layers on top of precise vector geometry; the geometry and route remain legible when GPU effects or animations are disabled.

## Evidence shaping the design

This is **desk research**, not a claim of user interviews or measured improvement.

1. [HUS patient arrival and self-registration](https://www.hus.fi/en/patient/patient-guide/welcome-treatment-hus) — Kela card / ID-assisted kiosk check-in and reception fallback.
2. [HUS Jorvi Hospital](https://www.hus.fi/en/patient/hospitals-and-other-units/jorvi-hospital/arriving-jorvi-hospital) — detailed guidance to the correct waiting area after arrival.
3. [Pohde / Oulu University Hospital emergency guidance](https://pohde.fi/palvelut/paivystys/?area=oulu) — locally relevant automated registration, considered separately from planned outpatient care.
4. [East Kent NHS patient appointments](https://www.ekhuft.nhs.uk/information-for-patients/your-appointment/) — self check-in followed by destination instructions.
5. [Cleveland Clinic AppointmentPass](https://my.clevelandclinic.org/patients/information/appointments-checklist) — barcode / manual options and human assistance.
6. [Singapore HealthHub mobile pre-registration](https://support.healthhub.sg/hc/en-us/articles/52607597773849-How-do-I-pre-register-and-obtain-a-queue-number-for-my-appointment-using-HealthHub-app) — queue number and pre-registration within an institution-dependent time window.
7. [NSW Health wayfinding for healthcare facilities](https://www.health.nsw.gov.au/Hospitals/Publications/wayfinding-for-healthcare-facilities.pdf) — design guidance for navigation in complex clinical buildings.

### Important safety and privacy boundaries

The Kela card can be used by participating services for check-in but is **not an official identity card**. Scanning a child's card does not itself authorize a guardian to act for that child. A production service would require hospital-approved identity, guardian, appointment and consent checks, as well as staff-handled exceptions. See [Kela](https://www.kela.fi/kela-card) and [Suomi.fi](https://www.suomi.fi/instructions-and-support/e-authorizations/acting-on-behalf-of-a-person/acting-on-behalf-of-an-underaged-child).

The prototype has no backend or patient-record connections. Every appointment, identity and queue number is fabricated for demonstration; nothing is transmitted or stored.

## Prototype implementation

Buildless static web project under `dist/`:

```text
dist/
  index.html       Case-study layout and sourced research
  styles.css       Responsive visual and interaction system
  app.js           Local interactive patient/child check-in state machine
  shader.js        Three.js GPU shader with graceful fallback
  wayfinding.js    Three-floor map, room labels, graph routing and printable floor legs
tests/
  wayfinding.test.cjs  Corridor alignment and route invariants
```

Open `dist/index.html` locally, or serve `dist` with a static file server. The kiosk works without Three.js and without a network connection; the optional shader and hosted fonts load when available.

## What would come next in a real hospital

Field research, patient and staff usability sessions, accessibility testing, clinical governance, localization review, device ergonomics, system integrations, privacy assessment and location-specific wayfinding data. The project intentionally does not claim any of those have already been completed.

---

**NORDCARE · Independent UX/UI and service design exploration · 2026**

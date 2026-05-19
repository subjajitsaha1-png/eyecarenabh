export type Category = "CORE" | "Commitment" | "Achievement" | "Excellence";
export type ComplianceStatus = "compliant" | "partial" | "non-compliant" | "not-assessed";

export interface ObjectiveElement {
  id: string;
  code: string;
  category: Category;
  text: string;
  interpretation: string;
  requiresWrittenGuidance?: boolean;
}

export interface Standard {
  id: string;
  code: string;
  title: string;
  elements: ObjectiveElement[];
}

export interface Chapter {
  id: string;
  code: string;
  name: string;
  fullName: string;
  intent: string;
  standards: Standard[];
  color: string;
}

export const chapters: Chapter[] = [
  {
    id: "aac",
    code: "AAC",
    name: "Access, Assessment & Continuity",
    fullName: "Access, Assessment and Continuity of Care",
    color: "blue",
    intent:
      "Ensures that patients receive appropriate eye care services, proper registration, thorough assessments, and seamless continuity across all phases of care within the Eye Care Organization.",
    standards: [
      {
        id: "aac-1",
        code: "AAC.1",
        title: "The ECO clearly defines and displays the range of eye care services it offers.",
        elements: [
          {
            id: "aac-1-a",
            code: "AAC.1.a",
            category: "CORE",
            text: "The eye care services provided are clearly and comprehensively defined.",
            interpretation:
              "Services are clearly defined by management and in tune with the scope of services listed in the application form. Each defined service should have appropriate diagnostics and treatment facilities with suitably qualified personnel who provide out-patient, in-patient and emergency cover. The scope of services may also contain outsource services, excluded services and affiliated services.",
          },
          {
            id: "aac-1-b",
            code: "AAC.1.b",
            category: "Commitment",
            text: "Each defined service includes appropriate diagnostic and treatment facilities, supported by suitably qualified personnel who manage outpatient, inpatient, and ophthalmic emergency services.",
            interpretation:
              "The organisation shall ensure that before starting a service, suitably qualified medical and nursing staff are available. The scope of service shall have outpatient facility, inpatient facility and the consultant shall provide emergency cover. Appropriate infrastructure for diagnostics and treatment facilities relevant to the scope of services should be available.",
          },
          {
            id: "aac-1-c",
            code: "AAC.1.c",
            category: "Commitment",
            text: "The defined eye care services are prominently displayed and staff are oriented to these services.",
            interpretation:
              "Services defined should be displayed prominently in an area visible to all patients entering the ECO. Display could be in the form of boards, citizen's charter, etc. They should be of permanent nature. Display in the form of brochures only is NOT acceptable. Display should be at least bi-lingual (English and the state language). Relevant staff in reception/registration, OPD, IPD and emergency services are oriented through regular training.",
            requiresWrittenGuidance: false,
          },
        ],
      },
      {
        id: "aac-2",
        code: "AAC.2",
        title:
          "The ECO maintains a well-documented process for registration, admission, and transfer of patients.",
        elements: [
          {
            id: "aac-2-a",
            code: "AAC.2.a",
            category: "CORE",
            text: "Documented policies and procedures govern the registration and admission of outpatients, inpatients, and emergency patients.",
            interpretation:
              "ECO shall prepare documents detailing policies and procedures for registration and admission including unidentified patients. All patients including emergencies shall be registered. Procedures address out-patients, day-care, in-patients and emergency patients. All admissions must be authorized by a doctor. A process to provide emergency care during non-working hours must be in place.",
            requiresWrittenGuidance: true,
          },
          {
            id: "aac-2-b",
            code: "AAC.2.b",
            category: "Commitment",
            text: "Patients are only admitted if the Eye Care Organization can provide the necessary services.",
            interpretation:
              "Staff handling admission and registration needs to be aware of the services the ECO can provide. In case of emergency, life-saving treatment shall be initiated before any decision is taken regarding acceptance.",
          },
          {
            id: "aac-2-c",
            code: "AAC.2.c",
            category: "Commitment",
            text: "Patient transfers, both incoming and outgoing, as well as referrals to other organizations, are managed appropriately.",
            interpretation:
              "This shall address both transfer-in and transfer-out. Transfer should be done safely with pre-transfer stabilization, appropriate equipment and monitoring during transfer. Staff accompanying shall be appropriately trained to manage medical emergencies.",
          },
          {
            id: "aac-2-d",
            code: "AAC.2.d",
            category: "Achievement",
            text: "Access to healthcare services is effectively prioritized based on the clinical needs of the patient.",
            interpretation:
              "Patients with clinical problems warranting earlier response are identified and prioritized in all care settings. E.g., patient with viral conjunctivitis, sudden loss of vision, eye injuries including chemical burns, medical emergencies, vulnerable patients and immediate post-op patients. All staff should be trained about triaging in medical and ophthalmic emergencies.",
          },
        ],
      },
      {
        id: "aac-3",
        code: "AAC.3",
        title:
          "Patients receive a detailed initial assessment upon admission, followed by consistent re-assessments throughout their care.",
        elements: [
          {
            id: "aac-3-a",
            code: "AAC.3.a",
            category: "CORE",
            text: "During all phases of care, there is a qualified individual/team responsible for the patient's care that coordinates care in all settings.",
            interpretation:
              "Care of patient is always given by appropriately qualified and trained medical personnel. Although care may be provided by a team, the hospital record shall identify a doctor as being responsible. Clear assignment of responsibility at every phase of care must be documented.",
          },
          {
            id: "aac-3-b",
            code: "AAC.3.b",
            category: "CORE",
            text: "The ECO defines content of the initial assessment for out-patients, day care, in-patients and emergency patients.",
            interpretation:
              "The organization shall have a format for initial assessment in OPD, day-care, emergency and in-patients. In emergency, vital parameters must be recorded. For in-patients, assessment by doctors and nursing staff shall cover history, examination including vital signs and documentation of drug allergies. Initial assessment shall contain presenting complaints, Vision and salient examination findings.",
            requiresWrittenGuidance: true,
          },
          {
            id: "aac-3-c",
            code: "AAC.3.c",
            category: "CORE",
            text: "The ECO determines who can perform the assessment.",
            interpretation:
              "The ECO determines which aspects of assessment can be done by allied health staff (Optometrists, Ophthalmic assistants, Ophthalmic technicians) and which by Ophthalmologists (Clinical evaluation, diagnosis, prognostication, formulation of care plan, prescription). Mandatory KPI: Time for Initial assessment of OP patients/Emergency.",
            requiresWrittenGuidance: true,
          },
          {
            id: "aac-3-d",
            code: "AAC.3.d",
            category: "CORE",
            text: "The ECO establishes the timeframe within which the initial assessment must be completed.",
            interpretation:
              "The ECO shall define and document the time frame for initial assessment completion for OPD/Emergency/Indoor patients. The timeframe shall include Optometric, Ophthalmological and Medical assessment - from the time of registration to completion of assessment by an ophthalmologist.",
          },
          {
            id: "aac-3-e",
            code: "AAC.3.e",
            category: "Commitment",
            text: "Outpatients are informed of their next follow-up appointment, as applicable.",
            interpretation:
              "This could be either in terms of a specific date or after a certain period and shall be documented in the medical record/OP consultation sheet. May not be applicable where a patient has come for just an opinion or the patient's condition does not warrant repeat visits.",
            requiresWrittenGuidance: true,
          },
          {
            id: "aac-3-f",
            code: "AAC.3.f",
            category: "Commitment",
            text: "Reassessments are conducted at appropriate intervals by a member of the medical team and are duly documented.",
            interpretation:
              "After initial assessment, the patient is re-assessed periodically and documented. Frequency may differ for different areas/specialities based on setting and patient condition. Reassessments shall also be done for significant changes in patient's condition. Every patient shall be reassessed at least once every day by the treating doctor.",
            requiresWrittenGuidance: true,
          },
        ],
      },
      {
        id: "aac-4",
        code: "AAC.4",
        title:
          "Laboratory services align with the ECO's scope of services and are available as required by the care protocols.",
        elements: [
          {
            id: "aac-4-a",
            code: "AAC.4.a",
            category: "Commitment",
            text: "Scope of the laboratory services is commensurate to the services provided by the ECO.",
            interpretation:
              "ECO should ensure availability of laboratory services commensurate with the healthcare services offered. Services may be within the organisation or outsourced to an external agency. At minimum, there should be facility for basic lab support and blood sugar assessment for emergency care.",
          },
          {
            id: "aac-4-b",
            code: "AAC.4.b",
            category: "Commitment",
            text: "Qualified and trained personnel are responsible for performing, supervising, and interpreting diagnostic investigations.",
            interpretation:
              "Laboratory personnel should be commensurate with scope of services. Staff should be suitably qualified (appropriate credentials/degree) and trained. Statutory requirements regarding authorised signatory shall be adhered to.",
          },
          {
            id: "aac-4-c",
            code: "AAC.4.c",
            category: "Commitment",
            text: "Procedures for requisition, collection, identification, handling, transportation, processing and disposal of specimens are followed.",
            interpretation:
              "The ECO has documented procedures for ordering, collection, identification, handling, safe transportation, processing and disposal of specimens. Unique identification number shall be used. Disposal of waste shall be as per statutory requirements (Bio-medical waste management rules).",
          },
          {
            id: "aac-4-d",
            code: "AAC.4.d",
            category: "Commitment",
            text: "Laboratory results are delivered within a specified timeframe. Critical results are communicated immediately to relevant healthcare personnel.",
            interpretation:
              "The ECO shall define the turnaround time for all tests. Critical limits for tests requiring immediate attention shall be established, documented and communicated. This includes critical results of outsourced investigations. Electronic health systems can supplement physical reporting.",
          },
          {
            id: "aac-4-e",
            code: "AAC.4.e",
            category: "Commitment",
            text: "Laboratory tests not available within the ECO are outsourced to external laboratories meeting established quality assurance standards.",
            interpretation:
              "The ECO shall have documented procedure for outsourcing tests including: list of tests, identity of personnel, manner of packaging and labeling, methodology to check performance of outsourced laboratory, and MoU/agreement incorporating quality assurance requirements.",
            requiresWrittenGuidance: true,
          },
          {
            id: "aac-4-f",
            code: "AAC.4.f",
            category: "Commitment",
            text: "The programme mandates regular calibration and maintenance of all laboratory equipments.",
            interpretation:
              "All measuring devices in the lab shall be subjected to periodic calibration and maintenance. Traceability certificates of all calibrations done shall be documented and maintained.",
            requiresWrittenGuidance: true,
          },
          {
            id: "aac-4-g",
            code: "AAC.4.g",
            category: "Commitment",
            text: "Laboratory personnel are appropriately trained in safe practices and provided with appropriate safety equipment and/or devices.",
            interpretation:
              "All laboratory staff undergo training regarding safe practices. Adequate safety devices are available: PPE, eye wash facilities, dressing materials, disinfectants, fire extinguishers. All laboratory personnel shall adhere to standard precautions at all times.",
          },
        ],
      },
      {
        id: "aac-5",
        code: "AAC.5",
        title:
          "Ophthalmic diagnostic and imaging services are available according to the scope of services of the ECO.",
        elements: [
          {
            id: "aac-5-a",
            code: "AAC.5.a",
            category: "CORE",
            text: "Ophthalmic diagnostic and imaging services are available as per the scope of services.",
            interpretation:
              "The ECO shall ensure availability of ophthalmic diagnostic and imaging services appropriate to its scope. Services may include OCT, Fundus photography, Visual field analysis, B-scan ultrasound, Corneal topography etc. as relevant.",
          },
          {
            id: "aac-5-b",
            code: "AAC.5.b",
            category: "Commitment",
            text: "Qualified personnel perform and interpret ophthalmic diagnostic imaging.",
            interpretation:
              "Personnel performing ophthalmic diagnostic imaging should be appropriately qualified and trained. Results should be interpreted by qualified ophthalmologists.",
          },
          {
            id: "aac-5-c",
            code: "AAC.5.c",
            category: "Commitment",
            text: "Imaging equipment is regularly calibrated and maintained.",
            interpretation:
              "All ophthalmic imaging equipment shall undergo regular calibration and maintenance. Maintenance records shall be documented and available.",
          },
        ],
      },
      {
        id: "aac-6",
        code: "AAC.6",
        title:
          "The ECO has a formalized discharge process that is documented and adhered to for all patients.",
        elements: [
          {
            id: "aac-6-a",
            code: "AAC.6.a",
            category: "Commitment",
            text: "The ECO has a documented discharge policy.",
            interpretation:
              "Discharge policy shall address criteria for discharge, discharge process and documentation requirements including discharge summary.",
          },
          {
            id: "aac-6-b",
            code: "AAC.6.b",
            category: "Commitment",
            text: "Discharge summaries are completed timely and comprehensively.",
            interpretation:
              "Discharge summary shall include diagnosis, treatment given, condition at discharge, follow-up plan and instructions to patient. Must be signed by treating doctor.",
          },
          {
            id: "aac-6-c",
            code: "AAC.6.c",
            category: "Commitment",
            text: "Patient and family are educated on post-discharge care.",
            interpretation:
              "Patient and family shall receive appropriate education and instructions about medications, follow-up, warning signs, and activities. This shall be documented.",
          },
        ],
      },
    ],
  },
  {
    id: "cop",
    code: "COP",
    name: "Care of Patients",
    fullName: "Care of Patients",
    color: "emerald",
    intent:
      "Ensures that patients receive appropriate, compassionate, and evidence-based ophthalmic care including operative procedures, anesthesia services, and end-of-life care where applicable.",
    standards: [
      {
        id: "cop-1",
        code: "COP.1",
        title: "The ECO provides appropriate care to patients.",
        elements: [
          {
            id: "cop-1-a",
            code: "COP.1.a",
            category: "CORE",
            text: "A documented and uniform care plan guides the care of all patients.",
            interpretation:
              "The care plan shall be developed by the treating doctor or team and documented in the medical record. The care plan should be updated based on the patient's response to treatment.",
          },
          {
            id: "cop-1-b",
            code: "COP.1.b",
            category: "CORE",
            text: "Care of patients is guided by applicable standards and clinical practice guidelines.",
            interpretation:
              "The ECO shall use relevant clinical practice guidelines for common ophthalmic conditions (cataract, glaucoma, corneal disease, retinal conditions, etc.) and document compliance with these guidelines.",
          },
          {
            id: "cop-1-c",
            code: "COP.1.c",
            category: "CORE",
            text: "High-risk and vulnerable patients are identified and managed accordingly.",
            interpretation:
              "Vulnerable patient groups include children, elderly, patients with disabilities, medically compromised patients. Appropriate care protocols should be established for each group.",
          },
          {
            id: "cop-1-d",
            code: "COP.1.d",
            category: "Commitment",
            text: "All orders of care are communicated clearly and documented.",
            interpretation:
              "Written/electronic orders are preferred. Verbal orders, when necessary, shall be read back and documented as soon as possible.",
          },
          {
            id: "cop-1-e",
            code: "COP.1.e",
            category: "Commitment",
            text: "The ECO ensures availability of emergency resuscitation equipment and trained personnel.",
            interpretation:
              "Emergency resuscitation equipment including crash cart/emergency trolley shall be available and checked regularly. Staff shall be trained in Basic Life Support (BLS) and Advanced Life Support (ALS).",
          },
        ],
      },
      {
        id: "cop-2",
        code: "COP.2",
        title: "The ECO provides appropriate anesthesia services.",
        elements: [
          {
            id: "cop-2-a",
            code: "COP.2.a",
            category: "Commitment",
            text: "Anesthesia services are provided as per the scope of services of the ECO.",
            interpretation:
              "Anesthesia services shall be provided by qualified anesthesiologists or trained medical personnel for local/topical anesthesia in appropriate settings.",
          },
          {
            id: "cop-2-b",
            code: "COP.2.b",
            category: "Commitment",
            text: "Pre-anesthesia evaluation is performed and documented for all patients receiving anesthesia.",
            interpretation:
              "Pre-anesthesia evaluation shall assess the patient's fitness for anesthesia including medical history, current medications, allergies, and relevant investigation results.",
          },
          {
            id: "cop-2-c",
            code: "COP.2.c",
            category: "Commitment",
            text: "Informed consent is obtained from all patients prior to anesthesia.",
            interpretation:
              "Informed consent for anesthesia shall be obtained separately from surgical consent, including explanation of type of anesthesia, risks, benefits, and alternatives.",
          },
          {
            id: "cop-2-d",
            code: "COP.2.d",
            category: "Commitment",
            text: "Intraoperative monitoring is performed and documented.",
            interpretation:
              "Appropriate monitoring based on the type of anesthesia shall be performed and documented. Post-anesthesia recovery shall be monitored using defined criteria before discharge from recovery area.",
          },
          {
            id: "cop-2-e",
            code: "COP.2.e",
            category: "Commitment",
            text: "Post-anesthesia care is documented.",
            interpretation:
              "Post-anesthesia care shall be documented using standardized criteria (e.g., Aldrete score). Criteria for discharge from recovery room shall be defined and documented.",
          },
        ],
      },
      {
        id: "cop-3",
        code: "COP.3",
        title: "The ECO ensures safe surgical/operative care.",
        elements: [
          {
            id: "cop-3-a",
            code: "COP.3.a",
            category: "CORE",
            text: "Informed consent is obtained prior to surgery.",
            interpretation:
              "Valid informed consent shall be obtained including explanation of procedure, risks, benefits, alternatives, and expected outcomes. Consent shall be documented and signed.",
          },
          {
            id: "cop-3-b",
            code: "COP.3.b",
            category: "CORE",
            text: "Surgical safety checklist is implemented and followed.",
            interpretation:
              "WHO Surgical Safety Checklist or equivalent shall be implemented: Sign-in (before anesthesia), Time-out (before incision), Sign-out (before patient leaves OT). Critical for eye surgery: site verification (right eye/left eye) is mandatory.",
          },
          {
            id: "cop-3-c",
            code: "COP.3.c",
            category: "CORE",
            text: "Surgical/procedure notes are documented.",
            interpretation:
              "Operative notes shall be documented immediately after the procedure including date, surgeon, procedure performed, findings, complications if any, and post-operative instructions.",
          },
        ],
      },
      {
        id: "cop-4",
        code: "COP.4",
        title: "The ECO provides appropriate care for special patient populations.",
        elements: [
          {
            id: "cop-4-a",
            code: "COP.4.a",
            category: "Commitment",
            text: "Pediatric patients receive age-appropriate eye care.",
            interpretation:
              "Specific protocols for pediatric ophthalmic examinations, treatment, and management of conditions like amblyopia, squint, and congenital cataract shall be established.",
          },
          {
            id: "cop-4-b",
            code: "COP.4.b",
            category: "Commitment",
            text: "Patients with disabilities receive appropriate care and accommodations.",
            interpretation:
              "Physical accessibility, communication accommodations, and special care protocols for patients with sensory, motor, or cognitive disabilities shall be available.",
          },
          {
            id: "cop-4-c",
            code: "COP.4.c",
            category: "Commitment",
            text: "Elderly patients receive appropriate ophthalmic care.",
            interpretation:
              "Specific considerations for elderly patients including multiple comorbidities, polypharmacy, fall risk, and conditions like age-related macular degeneration, cataract, and glaucoma shall be addressed.",
          },
          {
            id: "cop-4-d",
            code: "COP.4.d",
            category: "Commitment",
            text: "Patients with systemic diseases receive integrated ophthalmic care.",
            interpretation:
              "Patients with diabetes, hypertension, autoimmune diseases affecting the eye shall receive coordinated care between ophthalmology and relevant medical specialities.",
          },
          {
            id: "cop-4-e",
            code: "COP.4.e",
            category: "Commitment",
            text: "End-of-life care is provided with dignity and compassion where applicable.",
            interpretation:
              "For patients with terminal conditions, appropriate comfort care, pain management, and family support shall be provided. The ECO shall have documented policies for end-of-life care.",
          },
        ],
      },
      {
        id: "cop-5",
        code: "COP.5",
        title: "The ECO provides nutritional care to patients.",
        elements: [
          {
            id: "cop-5-a",
            code: "COP.5.a",
            category: "Commitment",
            text: "Nutritional screening is conducted for all inpatients.",
            interpretation:
              "A validated nutritional screening tool shall be used for all inpatients. Patients identified at nutritional risk shall receive appropriate dietary assessment and intervention.",
          },
          {
            id: "cop-5-b",
            code: "COP.5.b",
            category: "Commitment",
            text: "Appropriate diet is provided to inpatients.",
            interpretation:
              "Diet shall be prescribed based on the patient's medical condition and nutritional requirements. Special diets for diabetic, post-operative, and immunocompromised patients shall be available.",
          },
          {
            id: "cop-5-c",
            code: "COP.5.c",
            category: "Commitment",
            text: "Food preparation and handling meet safety standards.",
            interpretation:
              "Kitchen/food preparation area shall maintain hygiene standards. Food safety practices including temperature monitoring, storage, and preparation shall follow established guidelines.",
          },
          {
            id: "cop-5-d",
            code: "COP.5.d",
            category: "Commitment",
            text: "Nutrition counseling is provided to patients as appropriate.",
            interpretation:
              "Patients with conditions related to nutrition (diabetic retinopathy, vitamin A deficiency) shall receive appropriate dietary counseling.",
          },
          {
            id: "cop-5-e",
            code: "COP.5.e",
            category: "Commitment",
            text: "Nutritional care is documented in the medical record.",
            interpretation:
              "Nutritional screening, assessment, and interventions shall be documented in the patient's medical record.",
          },
          {
            id: "cop-5-f",
            code: "COP.5.f",
            category: "Commitment",
            text: "The ECO coordinates with dietetic services as appropriate.",
            interpretation:
              "If the ECO does not have in-house dietetic services, referral to external dietetic services shall be available. Coordination with dietitian shall be documented.",
          },
        ],
      },
      {
        id: "cop-6",
        code: "COP.6",
        title: "The ECO provides rehabilitation services as appropriate.",
        elements: [
          {
            id: "cop-6-a",
            code: "COP.6.a",
            category: "Commitment",
            text: "Low vision and visual rehabilitation services are available.",
            interpretation:
              "Low vision assessment and rehabilitation services including optical and non-optical aids, orientation and mobility training shall be available or referred to appropriate centers.",
          },
          {
            id: "cop-6-b",
            code: "COP.6.b",
            category: "Commitment",
            text: "Patients needing rehabilitation are identified and appropriate services provided.",
            interpretation:
              "A screening process to identify patients who would benefit from visual rehabilitation shall be in place. Referral pathways shall be established.",
          },
          {
            id: "cop-6-c",
            code: "COP.6.c",
            category: "Commitment",
            text: "Rehabilitation goals are documented and monitored.",
            interpretation:
              "Rehabilitation goals shall be set with patient participation and documented. Progress shall be monitored and documented.",
          },
          {
            id: "cop-6-d",
            code: "COP.6.d",
            category: "Commitment",
            text: "Rehabilitation outcomes are documented.",
            interpretation:
              "Functional outcomes of rehabilitation (improvement in visual acuity, mobility, activities of daily living) shall be documented.",
          },
          {
            id: "cop-6-e",
            code: "COP.6.e",
            category: "Commitment",
            text: "Discharge planning incorporates rehabilitation needs.",
            interpretation:
              "Discharge planning shall consider the patient's ongoing rehabilitation needs and community support requirements.",
          },
        ],
      },
    ],
  },
  {
    id: "mom",
    code: "MOM",
    name: "Management of Medication",
    fullName: "Management of Medication",
    color: "violet",
    intent:
      "Ensures safe prescribing, dispensing, administration and monitoring of medications within the Eye Care Organization to prevent medication errors and adverse drug events.",
    standards: [
      {
        id: "mom-1",
        code: "MOM.1",
        title: "The ECO has a systematic approach to medication management.",
        elements: [
          {
            id: "mom-1-a",
            code: "MOM.1.a",
            category: "CORE",
            text: "The ECO maintains a list of approved drugs (formulary).",
            interpretation:
              "A formulary or drug list appropriate to the ECO's scope of services shall be maintained and regularly updated. The formulary shall include ophthalmic medications (eye drops, ointments, injections) commonly used in eye care.",
          },
          {
            id: "mom-1-b",
            code: "MOM.1.b",
            category: "Commitment",
            text: "Drug storage meets safety and quality standards.",
            interpretation:
              "Medications shall be stored at appropriate temperatures, protected from light and moisture. Controlled substances shall be stored securely. Emergency medications shall be readily accessible.",
          },
          {
            id: "mom-1-c",
            code: "MOM.1.c",
            category: "Commitment",
            text: "Medication prescriptions are complete and legible.",
            interpretation:
              "Prescriptions shall include: drug name (generic preferred), dose, route, frequency, duration, and prescriber signature. Ophthalmic prescriptions shall clearly specify the eye (OD/OS/OU).",
          },
          {
            id: "mom-1-d",
            code: "MOM.1.d",
            category: "Commitment",
            text: "Medication administration is performed by authorized personnel.",
            interpretation:
              "Only authorized and trained personnel shall administer medications. Administration shall be documented including drug, dose, route, time, and administrator.",
          },
          {
            id: "mom-1-e",
            code: "MOM.1.e",
            category: "Commitment",
            text: "Medication errors are reported and analyzed.",
            interpretation:
              "A system for reporting, analyzing and learning from medication errors and near-misses shall be in place. Root cause analysis shall be performed for significant medication errors.",
          },
        ],
      },
      {
        id: "mom-2",
        code: "MOM.2",
        title: "The ECO has a process for handling high-alert medications.",
        elements: [
          {
            id: "mom-2-a",
            code: "MOM.2.a",
            category: "CORE",
            text: "High-alert medications are identified and managed with extra precautions.",
            interpretation:
              "High-alert medications (e.g., concentrated electrolytes, anticoagulants, intravitreal injection drugs like anti-VEGF, chemotherapeutic agents) shall be clearly labeled and stored separately with additional safety checks.",
          },
          {
            id: "mom-2-b",
            code: "MOM.2.b",
            category: "Commitment",
            text: "Look-alike sound-alike (LASA) medications are identified and managed.",
            interpretation:
              "LASA medications in the formulary shall be identified, labeled distinctively, and stored apart to prevent mix-up errors.",
          },
          {
            id: "mom-2-c",
            code: "MOM.2.c",
            category: "Commitment",
            text: "Concentrated electrolytes are not available in patient care areas without special precautions.",
            interpretation:
              "Concentrated electrolyte solutions shall not be stored in patient care areas unless specifically required, with appropriate safeguards and warning labels.",
          },
        ],
      },
      {
        id: "mom-3",
        code: "MOM.3",
        title: "The ECO has a process for patient-specific medication reconciliation.",
        elements: [
          {
            id: "mom-3-a",
            code: "MOM.3.a",
            category: "Commitment",
            text: "Medication reconciliation is performed at admission, transfer, and discharge.",
            interpretation:
              "A complete medication history including OTC medications, herbal remedies, eye drops and supplements shall be obtained and documented. Reconciliation at each transition point prevents medication errors.",
          },
          {
            id: "mom-3-b",
            code: "MOM.3.b",
            category: "Commitment",
            text: "Patients are educated about their medications.",
            interpretation:
              "Patients and caregivers shall be educated about their medications including purpose, dose, administration technique (especially for eye drops), side effects, and duration of treatment.",
          },
        ],
      },
    ],
  },
  {
    id: "pre",
    code: "PRE",
    name: "Patient Rights & Education",
    fullName: "Patient Rights and Education",
    color: "amber",
    intent:
      "Ensures that patient rights are respected, patients are adequately informed about their care, and effective patient education is provided to support informed decision-making and self-care.",
    standards: [
      {
        id: "pre-1",
        code: "PRE.1",
        title: "The ECO respects and promotes patient rights.",
        elements: [
          {
            id: "pre-1-a",
            code: "PRE.1.a",
            category: "CORE",
            text: "Patient rights and responsibilities are defined and displayed.",
            interpretation:
              "Patient rights including right to information, privacy, confidentiality, dignity, non-discrimination, and grievance redressal shall be defined and prominently displayed in the ECO. Rights shall be communicated in a language patients understand.",
          },
          {
            id: "pre-1-b",
            code: "PRE.1.b",
            category: "CORE",
            text: "Patient's right to privacy and confidentiality is protected.",
            interpretation:
              "Patient privacy during examination, treatment and personal care shall be ensured. Medical information shall be shared only with authorized persons. Camera use for documentation requires patient consent.",
          },
          {
            id: "pre-1-c",
            code: "PRE.1.c",
            category: "Commitment",
            text: "Patients are informed about their diagnosis, treatment options, expected outcomes and costs.",
            interpretation:
              "Patients shall receive complete and accurate information about their condition, available treatment options, expected outcomes, risks, and estimated costs. Information shall be provided in a language and format they can understand.",
          },
          {
            id: "pre-1-d",
            code: "PRE.1.d",
            category: "Commitment",
            text: "Informed consent is obtained for all procedures and treatments.",
            interpretation:
              "Valid informed consent shall be obtained before any invasive procedure, anesthesia, or high-risk treatment. Consent process shall include information, comprehension, voluntary decision, and documentation.",
          },
          {
            id: "pre-1-e",
            code: "PRE.1.e",
            category: "Commitment",
            text: "Patient grievances are addressed in a timely and systematic manner.",
            interpretation:
              "A formal grievance redressal mechanism shall be established. Complaints shall be received, acknowledged, investigated, and resolved within defined timeframes. Feedback shall be used for improvement.",
          },
        ],
      },
      {
        id: "pre-2",
        code: "PRE.2",
        title: "The ECO provides effective patient and family education.",
        elements: [
          {
            id: "pre-2-a",
            code: "PRE.2.a",
            category: "Commitment",
            text: "Patient educational needs are assessed.",
            interpretation:
              "Literacy level, language, culture, emotional state, and willingness to learn shall be assessed before education is provided. Education plan shall be tailored accordingly.",
          },
          {
            id: "pre-2-b",
            code: "PRE.2.b",
            category: "Commitment",
            text: "Patients and families are educated about their eye condition.",
            interpretation:
              "Education shall cover the nature of the condition, progression, complications, preventive measures, and warning signs. For chronic conditions (glaucoma, diabetic retinopathy), emphasis on adherence and regular follow-up.",
          },
          {
            id: "pre-2-c",
            code: "PRE.2.c",
            category: "Commitment",
            text: "Patients are educated about proper use of medications and eye drops.",
            interpretation:
              "Proper technique for instilling eye drops, frequency, storage requirements, and importance of not sharing medications shall be taught and demonstrated. Return demonstration shall be observed.",
          },
          {
            id: "pre-2-d",
            code: "PRE.2.d",
            category: "Commitment",
            text: "Patient education is documented.",
            interpretation:
              "Education provided, methods used, patient's understanding and response shall be documented in the medical record.",
          },
          {
            id: "pre-2-e",
            code: "PRE.2.e",
            category: "Commitment",
            text: "Discharge instructions are provided in written form.",
            interpretation:
              "Written discharge instructions covering medications, eye drop technique, activity restrictions, follow-up appointments, and warning signs to report shall be provided to every patient.",
          },
        ],
      },
    ],
  },
  {
    id: "ipc",
    code: "IPC",
    name: "Infection Prevention & Control",
    fullName: "Infection Prevention and Control",
    color: "teal",
    intent:
      "Prevents and controls infections within the Eye Care Organization through robust surveillance, hygiene practices, sterilization processes, and staff training to protect patients and healthcare workers.",
    standards: [
      {
        id: "ipc-1",
        code: "IPC.1",
        title: "The ECO has an infection prevention and control programme.",
        elements: [
          {
            id: "ipc-1-a",
            code: "IPC.1.a",
            category: "CORE",
            text: "There is a designated infection control team responsible for the IPC programme.",
            interpretation:
              "An infection control committee/team with representation from clinical departments shall be established. The team shall include at minimum an infection control nurse/coordinator and medical officer. Meetings shall be held at regular intervals.",
          },
          {
            id: "ipc-1-b",
            code: "IPC.1.b",
            category: "CORE",
            text: "The IPC programme is documented and implemented across the ECO.",
            interpretation:
              "A comprehensive IPC programme covering surveillance, standard precautions, transmission-based precautions, sterilization, waste management, and staff safety shall be documented and implemented.",
            requiresWrittenGuidance: true,
          },
          {
            id: "ipc-1-c",
            code: "IPC.1.c",
            category: "Commitment",
            text: "IPC data is collected, analyzed and used for improvement.",
            interpretation:
              "Infection rates, compliance data, and HAI surveillance data shall be collected, analyzed and shared with relevant stakeholders. Data shall be used to implement improvement measures.",
          },
        ],
      },
      {
        id: "ipc-2",
        code: "IPC.2",
        title: "The ECO implements standard precautions.",
        elements: [
          {
            id: "ipc-2-a",
            code: "IPC.2.a",
            category: "CORE",
            text: "Standard precautions are practiced by all staff in all patient care areas.",
            interpretation:
              "Standard precautions including hand hygiene, appropriate use of PPE, respiratory hygiene, safe injection practices, and waste management shall be practiced by all staff at all times.",
          },
          {
            id: "ipc-2-b",
            code: "IPC.2.b",
            category: "CORE",
            text: "Biomedical waste is managed as per statutory requirements.",
            interpretation:
              "Biomedical waste shall be segregated, collected, stored, transported and disposed as per Biomedical Waste Management Rules. Color-coded bins, labeled containers, and records of waste disposal shall be maintained.",
          },
          {
            id: "ipc-2-c",
            code: "IPC.2.c",
            category: "CORE",
            text: "Sharp safety practices are followed.",
            interpretation:
              "Safe handling and disposal of sharps including needles, lancets, and surgical instruments shall be practiced. Sharps containers shall be available at point of use. Needle-stick injury protocol shall be in place.",
          },
          {
            id: "ipc-2-d",
            code: "IPC.2.d",
            category: "Commitment",
            text: "Transmission-based precautions are implemented appropriately.",
            interpretation:
              "Contact, droplet, and airborne precautions shall be implemented for patients with known or suspected infections. Isolation facilities shall be available or arrangements made.",
          },
          {
            id: "ipc-2-e",
            code: "IPC.2.e",
            category: "Commitment",
            text: "Environmental cleaning and disinfection procedures are followed.",
            interpretation:
              "Cleaning and disinfection procedures for all areas, including high-touch surfaces, OT, procedure rooms, and equipment shall be documented and followed. Appropriate disinfectants and concentrations shall be used.",
          },
          {
            id: "ipc-2-f",
            code: "IPC.2.f",
            category: "Commitment",
            text: "The ECO adheres to laundry and linen management processes.",
            interpretation:
              "Linen change policy shall be defined. Handling of linen in patient care units, during transport, and in laundry shall follow standard practices. If outsourced, adequate controls shall be established.",
            requiresWrittenGuidance: true,
          },
          {
            id: "ipc-2-g",
            code: "IPC.2.g",
            category: "CORE",
            text: "The ECO adheres to kitchen sanitation and food-handling standards.",
            interpretation:
              "Kitchen sanitation measures are implemented to prevent cross-contamination. Periodic screening of kitchen workers for Salmonella typhi every six months or on return from leave of 15+ days.",
            requiresWrittenGuidance: true,
          },
          {
            id: "ipc-2-h",
            code: "IPC.2.h",
            category: "Commitment",
            text: "Engineering controls to prevent infections are in place.",
            interpretation:
              "Design of patient care areas, OT air quality, water supply, AHU maintenance, and renovation planning with infection control considerations shall be addressed.",
            requiresWrittenGuidance: true,
          },
          {
            id: "ipc-2-i",
            code: "IPC.2.i",
            category: "CORE",
            text: "Housekeeping procedures are implemented and monitored.",
            interpretation:
              "Categorization of areas, cleaning procedures, blood/body fluid cleanup, and common disinfectants with dilution factors shall be specified. Brooming and dry dusting inside clinical areas shall be avoided.",
            requiresWrittenGuidance: true,
          },
        ],
      },
      {
        id: "ipc-3",
        code: "IPC.3",
        title:
          "The ECO takes actions to prevent or reduce risks of Healthcare Associated Infections (HAI).",
        elements: [
          {
            id: "ipc-3-a",
            code: "IPC.3.a",
            category: "CORE",
            text: "Adequate and appropriate hand hygiene facilities are accessible in all patient care areas.",
            interpretation:
              "Washbasins with hands-free controls, soap, hand drying facilities, and hand sanitizers/rubs shall be available in all patient care areas. WHO's 5 Moments for Hand Hygiene shall be observed.",
          },
          {
            id: "ipc-3-b",
            code: "IPC.3.b",
            category: "Commitment",
            text: "Compliance with proper hand hygiene is monitored regularly.",
            interpretation:
              "Hand hygiene compliance shall be monitored regularly (at least monthly) for all categories of direct care staff. Compliance levels shall be shared with staff. WHO Observation Form is a good tool.",
          },
          {
            id: "ipc-3-c",
            code: "IPC.3.c",
            category: "Commitment",
            text: "The organization takes action to prevent surgical site infections.",
            interpretation:
              "Pre-op, intra-op, and post-op measures for SSI prevention including appropriate antibiotic prophylaxis, hair removal protocols, skin preparation, and OT air quality shall be implemented.",
          },
          {
            id: "ipc-3-d",
            code: "IPC.3.d",
            category: "CORE",
            text: "Scope of surveillance activities incorporates tracking and analysing infection risks, rates and trends.",
            interpretation:
              "Organization shall define data to be captured, periodicity, and reporting process. Evidence of periodic surveillance directed towards identified high-risk activities (OT infections, post-operative endophthalmitis) shall be provided.",
          },
          {
            id: "ipc-3-e",
            code: "IPC.3.e",
            category: "Commitment",
            text: "Appropriate feedback regarding HAI rates is provided regularly to appropriate personnel.",
            interpretation:
              "Feedback protocol, identification of appropriate personnel, data collection and analysis, and root cause analysis for identified HAIs shall be established and implemented.",
          },
          {
            id: "ipc-3-f",
            code: "IPC.3.f",
            category: "Commitment",
            text: "Adequate and appropriate PPE, soaps, and disinfectants are available and used correctly.",
            interpretation:
              "PPE including gloves, protective eyewear, masks, apron, gown, and cap/hair cover shall be available at point of use. Staff shall use appropriate PPE and dispose properly after use.",
          },
          {
            id: "ipc-3-g",
            code: "IPC.3.g",
            category: "Commitment",
            text: "Appropriate pre- and post-exposure prophylaxis is provided to all staff.",
            interpretation:
              "Documentation of occupational injuries, hepatitis B vaccination, and PEP for needle-stick injuries shall be maintained. All clinical staff shall be vaccinated against hepatitis B.",
            requiresWrittenGuidance: true,
          },
        ],
      },
      {
        id: "ipc-4",
        code: "IPC.4",
        title:
          "There are documented policies and procedures for sterilization activities in the ECO.",
        elements: [
          {
            id: "ipc-4-a",
            code: "IPC.4.a",
            category: "Commitment",
            text: "The ECO provides adequate space and appropriate zoning for sterilization activities.",
            interpretation:
              "CSSD shall have suitable location, unidirectional flow, zoning, and separation of clean and dirty areas. Separate areas for receiving, washing, cleaning, packing, sterilization, sterile storage and issue shall be available.",
          },
          {
            id: "ipc-4-b",
            code: "IPC.4.b",
            category: "CORE",
            text: "Cleaning, packing, disinfection/sterilization, storing and issue of items is done as per written guidance.",
            interpretation:
              "Documented policy and procedure for cleaning, usage of disinfectants, and sterilization for various ophthalmic equipment (phaco tubings, reusable instruments, IOL containers) shall be followed.",
          },
          {
            id: "ipc-4-c",
            code: "IPC.4.c",
            category: "Commitment",
            text: "The ECO has documented policy for reprocessing of instruments, equipment and devices.",
            interpretation:
              "Devices meant for re-use shall be identified. Number of reuses and process of re-use shall be defined and monitored. Patients shall be informed about reuse. Policies shall align with available good practices.",
            requiresWrittenGuidance: true,
          },
          {
            id: "ipc-4-d",
            code: "IPC.4.d",
            category: "Commitment",
            text: "Regular validation tests for sterilization are carried out and documented.",
            interpretation:
              "Bacteriologic tests, Bowie-Dick tape test, leak rate tests for autoclaves shall be carried out. WHO recommends: load number, content description, temperature, pressure, time-record, physical/chemical tests daily, weekly biological tests.",
            requiresWrittenGuidance: true,
          },
          {
            id: "ipc-4-e",
            code: "IPC.4.e",
            category: "Commitment",
            text: "There is an established recall procedure when breakdown in the sterilization system is identified.",
            interpretation:
              "Sterilization procedure shall be regularly monitored. In case of breakdown, procedure for withdrawal of affected items shall be in place. Batch-processing system with date and machine number enables effective recall.",
          },
        ],
      },
      {
        id: "ipc-5",
        code: "IPC.5",
        title: "The infection control programme is supported by management and includes staff training.",
        elements: [
          {
            id: "ipc-5-a",
            code: "IPC.5.a",
            category: "Commitment",
            text: "Hospital management makes available resources required for the IPC programme.",
            interpretation:
              "Resources required by infection control personnel including both human resources and materials shall be available in a sustained manner.",
          },
          {
            id: "ipc-5-b",
            code: "IPC.5.b",
            category: "Commitment",
            text: "The ECO conducts pre-induction sensitization programme for all appropriate categories of staff.",
            interpretation:
              "Documented evidence of induction training for all categories of staff (including doctors) before joining. Induction programme shall include IPC policies, procedures, and practices.",
          },
          {
            id: "ipc-5-c",
            code: "IPC.5.c",
            category: "Commitment",
            text: "The ECO conducts appropriate in-service training sessions for all staff at least once in a year.",
            interpretation:
              "Annual in-service training on IPC for all concerned categories of staff shall be conducted and documented.",
          },
        ],
      },
    ],
  },
  {
    id: "psq",
    code: "PSQ",
    name: "Patient Safety & Quality Improvement",
    fullName: "Patient Safety and Quality Improvement",
    color: "rose",
    intent:
      "Establishes a culture of patient safety and continuous quality improvement through structured programmes, monitoring of key indicators, clinical audits, and incident reporting and analysis.",
    standards: [
      {
        id: "psq-1",
        code: "PSQ.1",
        title:
          "There is a structured quality improvement and continuous monitoring program in the ECO.",
        elements: [
          {
            id: "psq-1-a",
            code: "PSQ.1.a",
            category: "CORE",
            text: "A comprehensive quality improvement programme is developed, implemented and monitored by a multi-disciplinary committee.",
            interpretation:
              "Committee shall have representation from management, clinical and support departments. Frequency of meeting at least once in three months. The quality improvement programme is a continuous process and updated at least annually.",
            requiresWrittenGuidance: true,
          },
          {
            id: "psq-1-b",
            code: "PSQ.1.b",
            category: "Commitment",
            text: "There is a designated individual for coordinating and implementing the quality improvement programme.",
            interpretation:
              "Preferably a person with good knowledge of accreditation standards, statutory requirements, hospital quality improvement principles. E.g., accreditation coordinator, management representative, quality manager.",
            requiresWrittenGuidance: true,
          },
          {
            id: "psq-1-c",
            code: "PSQ.1.c",
            category: "Commitment",
            text: "The quality improvement programme is communicated and coordinated amongst all staff through appropriate training.",
            interpretation:
              "Staff are made aware of the quality assurance program structure and their individual roles. This could be done through regular training or supply of educative/printed materials.",
          },
          {
            id: "psq-1-d",
            code: "PSQ.1.d",
            category: "Commitment",
            text: "The quality improvement programme identifies opportunities for improvement based on reviews at pre-defined intervals.",
            interpretation:
              "Quality improvement committee shall review programme at least once in three months including focused audits, ECO performance, and key indicators analysis. Minutes of review meetings shall be recorded and maintained.",
            requiresWrittenGuidance: true,
          },
          {
            id: "psq-1-e",
            code: "PSQ.1.e",
            category: "Commitment",
            text: "Quality improvement activities are guided by evidence-based practices.",
            interpretation:
              "Improvement activities shall be based on current best practices, clinical evidence, and national/international guidelines. PDCA/PDSA cycles or similar methodologies shall be used.",
          },
          {
            id: "psq-1-f",
            code: "PSQ.1.f",
            category: "Commitment",
            text: "The ECO communicates outcomes of quality improvement activities to stakeholders.",
            interpretation:
              "Results of quality improvement activities including improvements achieved shall be communicated to relevant staff, management, and other stakeholders.",
          },
          {
            id: "psq-1-g",
            code: "PSQ.1.g",
            category: "CORE",
            text: "The ECO monitors performance using key indicators.",
            interpretation:
              "Key indicators appropriate to the ECO's scope shall be selected, monitored and analyzed regularly. Both clinical and operational indicators shall be included.",
          },
          {
            id: "psq-1-h",
            code: "PSQ.1.h",
            category: "Achievement",
            text: "The ECO benchmarks its performance with external standards or peer organizations.",
            interpretation:
              "The ECO shall compare its key indicator performance with national benchmarks, guidelines, or peer organisations. Benchmarking data shall be used to set improvement targets.",
          },
        ],
      },
      {
        id: "psq-2",
        code: "PSQ.2",
        title: "There is a structured patient safety programme in the ECO.",
        elements: [
          {
            id: "psq-2-a",
            code: "PSQ.2.a",
            category: "CORE",
            text: "The ECO has a patient safety programme addressing identified safety risks.",
            interpretation:
              "Patient safety programme shall address surgical safety (wrong site surgery prevention), medication safety, fall prevention, patient identification, and healthcare-associated infection prevention specific to ophthalmic care.",
            requiresWrittenGuidance: true,
          },
          {
            id: "psq-2-b",
            code: "PSQ.2.b",
            category: "Commitment",
            text: "Patients are correctly identified before any procedure or administration of treatment.",
            interpretation:
              "At least two patient identifiers (name and date of birth OR MRD number) shall be used. Wristbands for inpatients are recommended. Pre-operative site marking (right/left eye) is mandatory.",
          },
          {
            id: "psq-2-c",
            code: "PSQ.2.c",
            category: "Commitment",
            text: "Critical results and information are communicated effectively.",
            interpretation:
              "Process for communication of critical lab results, critical clinical findings, and hand-over communication shall be established and documented. Read-back protocol for verbal orders shall be practiced.",
          },
          {
            id: "psq-2-d",
            code: "PSQ.2.d",
            category: "Commitment",
            text: "The ECO implements measures to prevent wrong site, wrong procedure, and wrong patient surgery.",
            interpretation:
              "Universal protocol including site marking, pre-operative verification, and time-out procedure shall be implemented for all surgical procedures. For ophthalmic surgery, laterality verification is critical.",
          },
          {
            id: "psq-2-e",
            code: "PSQ.2.e",
            category: "Commitment",
            text: "Patient fall prevention programme is implemented.",
            interpretation:
              "Fall risk assessment using validated tool shall be conducted for all inpatients. Fall prevention measures shall be implemented based on risk assessment. Falls shall be documented and analyzed.",
          },
        ],
      },
      {
        id: "psq-3",
        code: "PSQ.3",
        title:
          "The organisation identifies key indicators to monitor clinical structures, processes and outcomes.",
        elements: [
          {
            id: "psq-3-a",
            code: "PSQ.3.a",
            category: "Commitment",
            text: "Clinical indicators appropriate to the scope of services are identified and monitored.",
            interpretation:
              "Mandatory clinical indicators for eye care include: visual outcomes post-cataract surgery, endophthalmitis rate, surgical site infection rate, patient satisfaction, and unplanned readmission rate.",
          },
          {
            id: "psq-3-b",
            code: "PSQ.3.b",
            category: "Commitment",
            text: "Indicators are analyzed and the analysis results in action for improvement.",
            interpretation:
              "Regular analysis of indicator data shall result in specific improvement actions. Improvement actions shall be documented, implemented, and their effectiveness measured.",
          },
          {
            id: "psq-3-c",
            code: "PSQ.3.c",
            category: "Commitment",
            text: "The organisation monitors patient satisfaction.",
            interpretation:
              "Patient satisfaction surveys shall be conducted regularly. Results shall be analyzed and used for improvement. Patient complaints shall be tracked separately.",
          },
          {
            id: "psq-3-d",
            code: "PSQ.3.d",
            category: "Commitment",
            text: "Staff satisfaction is monitored.",
            interpretation:
              "Staff satisfaction surveys shall be conducted annually. Results shall be analyzed and action taken on areas of dissatisfaction.",
          },
          {
            id: "psq-3-e",
            code: "PSQ.3.e",
            category: "Commitment",
            text: "The organisation monitors operational indicators.",
            interpretation:
              "Operational indicators such as patient waiting times, OT utilization, bed occupancy, repeat OPD visits within 7 days shall be monitored and used for improvement.",
          },
        ],
      },
      {
        id: "psq-4",
        code: "PSQ.4",
        title: "There is an established system for clinical audit and quality improvement programmes.",
        elements: [
          {
            id: "psq-4-a",
            code: "PSQ.4.a",
            category: "Commitment",
            text: "Clinical audits are conducted periodically.",
            interpretation:
              "Planned clinical audits on relevant ophthalmic care processes (surgical outcomes, adherence to clinical guidelines, prescription patterns) shall be conducted. Audit results shall be disseminated and improvement actions taken.",
          },
          {
            id: "psq-4-b",
            code: "PSQ.4.b",
            category: "CORE",
            text: "Mortality reviews are conducted for all in-hospital deaths.",
            interpretation:
              "All in-hospital deaths shall be reviewed. Root cause analysis shall be performed for unexpected deaths. Learning from mortality reviews shall be used for quality improvement.",
          },
          {
            id: "psq-4-c",
            code: "PSQ.4.c",
            category: "Commitment",
            text: "Peer review of surgical outcomes is conducted.",
            interpretation:
              "Regular peer review of surgical outcomes including complications, visual outcomes, and adherence to protocols shall be conducted. Results shall be shared with surgical team for improvement.",
          },
          {
            id: "psq-4-d",
            code: "PSQ.4.d",
            category: "Commitment",
            text: "The ECO defines and monitors sentinel events.",
            interpretation:
              "Sentinel events including wrong site surgery, retained instruments, transfusion reactions, and unexpected deaths shall be defined. Intensive investigation including RCA shall be conducted when they occur.",
          },
        ],
      },
      {
        id: "psq-5",
        code: "PSQ.5",
        title: "Incidents are collected and analysed to ensure continual quality improvement.",
        elements: [
          {
            id: "psq-5-a",
            code: "PSQ.5.a",
            category: "CORE",
            text: "A non-punitive incident reporting system is in place.",
            interpretation:
              "A voluntary, confidential, and non-punitive incident reporting system shall be established. All categories of staff shall be encouraged to report incidents, near-misses, and adverse events.",
          },
          {
            id: "psq-5-b",
            code: "PSQ.5.b",
            category: "Commitment",
            text: "Incidents are analysed and learning is disseminated.",
            interpretation:
              "Reported incidents shall be categorized, analyzed for trends and root causes. Learning from incidents shall be disseminated to relevant staff. Improvement actions shall be implemented.",
          },
          {
            id: "psq-5-c",
            code: "PSQ.5.c",
            category: "Commitment",
            text: "The ECO demonstrates a learning culture from incidents and near-misses.",
            interpretation:
              "Evidence of improvements implemented as a result of incident analysis shall be available. Staff awareness of incident reporting and its value shall be demonstrated.",
          },
        ],
      },
    ],
  },
  {
    id: "rom",
    code: "ROM",
    name: "Responsibility of Management",
    fullName: "Responsibility of Management",
    color: "indigo",
    intent:
      "Ensures that the Eye Care Organization's leadership provides direction, resources, and oversight necessary to maintain high standards of quality, safety, and ethical practice.",
    standards: [
      {
        id: "rom-1",
        code: "ROM.1",
        title: "The ECO has a defined governance structure.",
        elements: [
          {
            id: "rom-1-a",
            code: "ROM.1.a",
            category: "CORE",
            text: "The ECO has a documented governance and organizational structure.",
            interpretation:
              "An organizational chart clearly depicting the governance structure, reporting relationships, and areas of responsibility shall be documented and displayed.",
          },
          {
            id: "rom-1-b",
            code: "ROM.1.b",
            category: "Commitment",
            text: "Roles and responsibilities of key management personnel are defined.",
            interpretation:
              "Job descriptions defining roles, responsibilities, authority, and accountability for all key management positions shall be documented.",
          },
          {
            id: "rom-1-c",
            code: "ROM.1.c",
            category: "Commitment",
            text: "The ECO complies with applicable laws and regulations.",
            interpretation:
              "Compliance with Clinical Establishments Act, NMC guidelines, Biomedical Waste Management Rules, pre-conception & pre-natal diagnostic techniques laws, and other applicable regulations shall be maintained and documented.",
          },
        ],
      },
      {
        id: "rom-2",
        code: "ROM.2",
        title: "The management provides strategic direction to the ECO.",
        elements: [
          {
            id: "rom-2-a",
            code: "ROM.2.a",
            category: "Commitment",
            text: "The ECO has a defined mission, vision, and values.",
            interpretation:
              "Mission, vision, and values shall be defined, documented, and prominently displayed. Staff shall be aware of and aligned with these.",
          },
          {
            id: "rom-2-b",
            code: "ROM.2.b",
            category: "Commitment",
            text: "The ECO has a strategic plan.",
            interpretation:
              "A strategic plan with defined goals, objectives, strategies, and timelines shall be developed. Progress against strategic plan shall be monitored and reported.",
          },
          {
            id: "rom-2-c",
            code: "ROM.2.c",
            category: "Commitment",
            text: "Management supports and participates in quality improvement activities.",
            interpretation:
              "Management participation in quality committee meetings, allocation of resources for quality improvement, and recognition of quality achievements shall be demonstrated.",
          },
        ],
      },
      {
        id: "rom-3",
        code: "ROM.3",
        title: "The ECO ensures ethical management practices.",
        elements: [
          {
            id: "rom-3-a",
            code: "ROM.3.a",
            category: "CORE",
            text: "The ECO has documented ethical policies and practices.",
            interpretation:
              "Ethics policy covering patient rights, conflict of interest, research ethics, and business ethics shall be documented. An ethics committee or mechanism for ethical decision-making shall be established.",
          },
          {
            id: "rom-3-b",
            code: "ROM.3.b",
            category: "Commitment",
            text: "Financial management is transparent and accountable.",
            interpretation:
              "Billing practices shall be transparent. Bill itemization shall be provided to patients. Financial records shall be maintained as per statutory requirements.",
          },
          {
            id: "rom-3-c",
            code: "ROM.3.c",
            category: "Commitment",
            text: "The ECO has mechanisms for conflict of interest disclosure and management.",
            interpretation:
              "Processes for identifying, disclosing, and managing conflicts of interest for clinical and management staff shall be established.",
          },
        ],
      },
    ],
  },
  {
    id: "fms",
    code: "FMS",
    name: "Facility Management & Safety",
    fullName: "Facility Management and Safety",
    color: "orange",
    intent:
      "Ensures that the physical environment of the Eye Care Organization is safe, well-maintained, and compliant with regulations to protect patients, staff, and visitors.",
    standards: [
      {
        id: "fms-1",
        code: "FMS.1",
        title: "The ECO provides a safe and well-maintained physical environment.",
        elements: [
          {
            id: "fms-1-a",
            code: "FMS.1.a",
            category: "CORE",
            text: "The ECO meets applicable safety regulations and building codes.",
            interpretation:
              "The facility shall comply with fire safety regulations, electrical safety standards, structural safety requirements, and accessibility standards (RPWD Act 2016). Valid fire NOC and other statutory certificates shall be maintained.",
          },
          {
            id: "fms-1-b",
            code: "FMS.1.b",
            category: "CORE",
            text: "Fire safety systems are in place and functional.",
            interpretation:
              "Fire detection systems, firefighting equipment, emergency exits, evacuation routes, and fire safety training for staff shall be in place. Mock drills shall be conducted at least twice a year.",
          },
          {
            id: "fms-1-c",
            code: "FMS.1.c",
            category: "Commitment",
            text: "Electrical safety is maintained.",
            interpretation:
              "Regular electrical safety inspections, earthing, proper wiring, protection of electrical panels, and emergency power backup (UPS/generator) for critical areas including OT shall be ensured.",
          },
          {
            id: "fms-1-d",
            code: "FMS.1.d",
            category: "Commitment",
            text: "The ECO ensures safety of medical equipment.",
            interpretation:
              "Inventory of all medical equipment, planned preventive maintenance, calibration records, and equipment incident reporting shall be maintained.",
          },
          {
            id: "fms-1-e",
            code: "FMS.1.e",
            category: "Commitment",
            text: "Hazardous materials are managed safely.",
            interpretation:
              "Inventory of hazardous materials including chemicals, gases, and biological agents. MSDS (Material Safety Data Sheets) shall be available. Storage, handling, and disposal procedures shall follow established guidelines.",
          },
        ],
      },
      {
        id: "fms-2",
        code: "FMS.2",
        title: "The ECO manages medical equipment effectively.",
        elements: [
          {
            id: "fms-2-a",
            code: "FMS.2.a",
            category: "Commitment",
            text: "Medical equipment is selected, maintained, and calibrated appropriately.",
            interpretation:
              "Equipment procurement, acceptance testing, preventive maintenance schedule, and calibration schedule shall be documented and followed. Critical ophthalmic equipment (slit lamp, applanation tonometer, phacoemulsification machine) shall be prioritized.",
          },
          {
            id: "fms-2-b",
            code: "FMS.2.b",
            category: "Commitment",
            text: "Equipment failure and maintenance issues are documented and addressed.",
            interpretation:
              "Equipment breakdown, repair, and downtime shall be documented. Alternative arrangements during equipment breakdown shall be in place.",
          },
          {
            id: "fms-2-c",
            code: "FMS.2.c",
            category: "Commitment",
            text: "Staff are trained in the safe and correct use of medical equipment.",
            interpretation:
              "Training on safe use and basic troubleshooting of medical equipment shall be provided to relevant staff. Training records shall be maintained.",
          },
        ],
      },
    ],
  },
  {
    id: "hrm",
    code: "HRM",
    name: "Human Resource Management",
    fullName: "Human Resource Management",
    color: "cyan",
    intent:
      "Ensures that the Eye Care Organization has appropriately qualified, trained, and motivated staff to deliver safe and high-quality eye care services.",
    standards: [
      {
        id: "hrm-1",
        code: "HRM.1",
        title: "The ECO has an adequate and qualified workforce.",
        elements: [
          {
            id: "hrm-1-a",
            code: "HRM.1.a",
            category: "CORE",
            text: "The ECO has documented workforce planning.",
            interpretation:
              "Workforce planning based on scope of services, patient load, and regulatory requirements shall be documented. Planning shall cover doctors, nurses, optometrists, and other allied health professionals.",
          },
          {
            id: "hrm-1-b",
            code: "HRM.1.b",
            category: "CORE",
            text: "All clinical staff possess required qualifications and valid registrations.",
            interpretation:
              "Verification of credentials, degrees, and registration with appropriate councils (NMC, State Medical Council, Nursing Council, Optometry Council) shall be done and documented for all clinical staff.",
          },
          {
            id: "hrm-1-c",
            code: "HRM.1.c",
            category: "Commitment",
            text: "Job descriptions are defined for all positions.",
            interpretation:
              "Job descriptions covering qualifications, responsibilities, authority, and performance expectations shall be defined for all positions and made available to staff.",
          },
          {
            id: "hrm-1-d",
            code: "HRM.1.d",
            category: "Commitment",
            text: "A formal orientation and induction programme exists for new staff.",
            interpretation:
              "Structured induction covering ECO policies, procedures, patient rights, safety practices, and role-specific information shall be provided to all new staff. Completion shall be documented.",
          },
        ],
      },
      {
        id: "hrm-2",
        code: "HRM.2",
        title: "The ECO provides continuous professional development.",
        elements: [
          {
            id: "hrm-2-a",
            code: "HRM.2.a",
            category: "Commitment",
            text: "Training needs are identified and addressed for all staff categories.",
            interpretation:
              "Annual training needs assessment shall be conducted. Individual training plans and organizational training calendar shall be developed. Training shall cover clinical skills, patient safety, and soft skills.",
          },
          {
            id: "hrm-2-b",
            code: "HRM.2.b",
            category: "Commitment",
            text: "Training programmes are conducted and effectiveness is evaluated.",
            interpretation:
              "Training shall be conducted as per the plan. Effectiveness of training shall be evaluated through tests, observation, or performance monitoring. Training records shall be maintained.",
          },
          {
            id: "hrm-2-c",
            code: "HRM.2.c",
            category: "Commitment",
            text: "Staff competency is assessed and documented periodically.",
            interpretation:
              "Competency assessment for clinical staff covering technical skills (e.g., refraction, slit lamp examination, surgical skills) shall be conducted periodically and documented.",
          },
          {
            id: "hrm-2-d",
            code: "HRM.2.d",
            category: "Commitment",
            text: "BLS/ACLS training is provided to appropriate staff.",
            interpretation:
              "All clinical staff directly involved in patient care shall have valid BLS certification. Relevant staff shall have ACLS/ATLS certification. Records shall be maintained.",
          },
        ],
      },
      {
        id: "hrm-3",
        code: "HRM.3",
        title: "The ECO promotes staff health, safety and wellbeing.",
        elements: [
          {
            id: "hrm-3-a",
            code: "HRM.3.a",
            category: "Commitment",
            text: "Staff health and safety programme is in place.",
            interpretation:
              "Occupational health and safety programme including pre-employment medical examination, annual health checks, vaccination programme (hepatitis B, influenza), and management of occupational exposures shall be in place.",
          },
          {
            id: "hrm-3-b",
            code: "HRM.3.b",
            category: "Commitment",
            text: "Mechanisms exist to address staff complaints and grievances.",
            interpretation:
              "Formal mechanism for staff to raise concerns about safety, ethical issues, and working conditions shall be established. Anonymous reporting shall be possible. Complaints shall be addressed in a timely manner.",
          },
          {
            id: "hrm-3-c",
            code: "HRM.3.c",
            category: "Commitment",
            text: "Performance appraisal system is in place.",
            interpretation:
              "Regular performance appraisal using defined criteria and KPIs shall be conducted. Appraisal results shall be linked to training needs and career development.",
          },
        ],
      },
    ],
  },
  {
    id: "ims",
    code: "IMS",
    name: "Information Management System",
    fullName: "Information Management System",
    color: "slate",
    intent:
      "Ensures that the Eye Care Organization has effective systems for managing patient records, operational data, and information technology to support quality care and decision-making.",
    standards: [
      {
        id: "ims-1",
        code: "IMS.1",
        title: "The ECO has an effective information management system.",
        elements: [
          {
            id: "ims-1-a",
            code: "IMS.1.a",
            category: "CORE",
            text: "The ECO has a documented information management policy.",
            interpretation:
              "A comprehensive information management policy covering medical records, data privacy, security, retention, and access shall be documented and implemented.",
          },
          {
            id: "ims-1-b",
            code: "IMS.1.b",
            category: "Commitment",
            text: "Information technology systems support efficient ECO operations.",
            interpretation:
              "Hospital Information System (HIS) or Electronic Medical Records (EMR) shall support patient registration, appointment scheduling, clinical documentation, billing, and reporting. Systems shall have appropriate security features.",
          },
          {
            id: "ims-1-c",
            code: "IMS.1.c",
            category: "Commitment",
            text: "Data is used for quality monitoring and decision-making.",
            interpretation:
              "Clinical and operational data shall be systematically collected, analyzed, and used for quality monitoring, performance improvement, and management decision-making.",
          },
        ],
      },
      {
        id: "ims-2",
        code: "IMS.2",
        title: "Medical records are complete, accurate, and available.",
        elements: [
          {
            id: "ims-2-a",
            code: "IMS.2.a",
            category: "CORE",
            text: "Each patient has a unique identifier and a single comprehensive medical record.",
            interpretation:
              "A unique patient identification number shall be assigned to each patient. All clinical information shall be consolidated in a single medical record whether physical or electronic.",
          },
          {
            id: "ims-2-b",
            code: "IMS.2.b",
            category: "CORE",
            text: "Medical records contain required clinical information.",
            interpretation:
              "Medical records shall contain: patient identification, history, physical examination findings (including visual acuity, refraction, IOP, and relevant eye examination findings), investigations, diagnosis, care plan, treatment, and outcome.",
          },
          {
            id: "ims-2-c",
            code: "IMS.2.c",
            category: "Commitment",
            text: "All entries in medical records are dated, timed, and authenticated.",
            interpretation:
              "Every entry shall have date, time, and signature with name and designation of the care provider. Corrections shall be made by drawing a single line, initialing and dating. No correction fluid shall be used.",
          },
          {
            id: "ims-2-d",
            code: "IMS.2.d",
            category: "Commitment",
            text: "Medical records are available to authorized care providers at all times.",
            interpretation:
              "Records shall be retrievable 24 hours a day. Electronic systems shall have user IDs and passwords. Physical records shall have a retrieval system that functions round the clock.",
          },
        ],
      },
      {
        id: "ims-3",
        code: "IMS.3",
        title: "The ECO maintains complete and accurate records for all patients.",
        elements: [
          {
            id: "ims-3-a",
            code: "IMS.3.a",
            category: "Commitment",
            text: "Final diagnosis is documented in all patient records.",
            interpretation:
              "Final diagnosis (preferably per ICD coding) must be documented by treating doctor in all records. Medical records department shall code all diagnoses per ICD.",
          },
          {
            id: "ims-3-b",
            code: "IMS.3.b",
            category: "Commitment",
            text: "The medical record contains details of assessments, investigations, operative procedures, and care provided.",
            interpretation:
              "Details of assessments, re-assessments, consultations, investigation results, and operative/procedure notes shall be part of the medical record.",
          },
          {
            id: "ims-3-c",
            code: "IMS.3.c",
            category: "Commitment",
            text: "Transfer documentation is complete in medical records.",
            interpretation:
              "Date of transfer, reason, name of receiving organization, and clinical condition before transfer shall be documented. If patient requested transfer, a note shall be added.",
          },
          {
            id: "ims-3-d",
            code: "IMS.3.d",
            category: "Commitment",
            text: "Discharge summary is included in the medical record.",
            interpretation:
              "Discharge summary shall be signed by qualified personnel and acknowledged by patient/relative. It shall include diagnosis, treatment, condition at discharge, and follow-up plan.",
          },
          {
            id: "ims-3-e",
            code: "IMS.3.e",
            category: "Commitment",
            text: "In case of death, cause of death certificate is included in the medical record.",
            interpretation:
              "Certificate shall mention cause, date, and time of death as per WHO International Form. Cardiac/respiratory arrest is an event, not a cause of death.",
          },
          {
            id: "ims-3-f",
            code: "IMS.3.f",
            category: "Commitment",
            text: "Care providers have access to current and past medical records.",
            interpretation:
              "Authorized healthcare providers shall have 24-hour access to patient records. Electronic systems shall have user ID and password. Physical records shall be retrievable after MRD hours.",
          },
        ],
      },
      {
        id: "ims-4",
        code: "IMS.4",
        title: "The organisation maintains confidentiality, integrity and security of records.",
        elements: [
          {
            id: "ims-4-a",
            code: "IMS.4.a",
            category: "CORE",
            text: "The organisation maintains confidentiality of records, data and information.",
            interpretation:
              "Only authorised persons shall have access to record contents. Authentication, access control, and automatic log-off features shall protect data privacy. Only clinical care providers should have access to clinical records.",
          },
          {
            id: "ims-4-b",
            code: "IMS.4.b",
            category: "CORE",
            text: "The organisation maintains integrity of records, data and information.",
            interpretation:
              "Records shall not be tampered. Corrections shall follow defined written guidance. System shall track changes made in records or data.",
          },
          {
            id: "ims-4-c",
            code: "IMS.4.c",
            category: "CORE",
            text: "The organisation maintains security of records, data and information.",
            interpretation:
              "Storage and retrieval systems shall facilitate timely access. Electronic systems shall have safeguards against virus/trojans with proper backup. Physical records shall have pest control and fire-safe storage.",
          },
          {
            id: "ims-4-d",
            code: "IMS.4.d",
            category: "Commitment",
            text: "Privileged health information is disclosed only with patient authorization or as required by law.",
            interpretation:
              "Written authorization from patient required for disclosure. Special care for medico-legal cases. Specific circumstances for government-required reporting shall be defined.",
          },
          {
            id: "ims-4-e",
            code: "IMS.4.e",
            category: "Commitment",
            text: "Requests for access to medical records are addressed consistently.",
            interpretation:
              "Release of information shall be in accordance with Right to Privacy and Code of Medical Ethics 2002. RTI grievances shall be addressed by appropriate bodies. Denial permitted only if release would endanger life/safety.",
          },
        ],
      },
      {
        id: "ims-5",
        code: "IMS.5",
        title:
          "The organisation ensures availability and retention of current and relevant documents.",
        elements: [
          {
            id: "ims-5-a",
            code: "IMS.5.a",
            category: "CORE",
            text: "The organisation has an effective process for document control.",
            interpretation:
              "All documents including forms, policies, and procedures shall be current, updated with proper control number/code/version, reviewed, authorized, and released by designated individuals. Obsolete documents shall be archived.",
          },
          {
            id: "ims-5-b",
            code: "IMS.5.b",
            category: "CORE",
            text: "The organisation retains patient's clinical records according to its requirements.",
            interpretation:
              "Retention period for each category of records (outpatient, inpatient, MLC) shall be defined per NMC and state authority rules. Formats used for data capture shall also have defined retention periods.",
          },
          {
            id: "ims-5-c",
            code: "IMS.5.c",
            category: "Commitment",
            text: "The retention process provides expected confidentiality and security.",
            interpretation:
              "Both manual and electronic systems shall maintain confidentiality and security of records during the retention period.",
          },
          {
            id: "ims-5-d",
            code: "IMS.5.d",
            category: "Commitment",
            text: "The destruction of medical records is in accordance with laid-down policy.",
            interpretation:
              "Destruction can be done after retention period is over and after taking approval of concerned authority.",
          },
        ],
      },
      {
        id: "ims-6",
        code: "IMS.6",
        title: "The ECO regularly carries out review of medical records.",
        elements: [
          {
            id: "ims-6-a",
            code: "IMS.6.a",
            category: "CORE",
            text: "Medical records are reviewed periodically.",
            interpretation:
              "Periodicity of review shall be defined by the organisation. A standardized checklist shall be used.",
          },
          {
            id: "ims-6-b",
            code: "IMS.6.b",
            category: "Commitment",
            text: "The review uses a representative sample based on statistical principles.",
            interpretation:
              "An adequate mix of active and discharged patients shall be used. Sampling principles (random sampling) shall be defined. Review shall include total discharges, deaths, and indoor patients.",
          },
          {
            id: "ims-6-c",
            code: "IMS.6.c",
            category: "Commitment",
            text: "The review is conducted by identified individuals.",
            interpretation:
              "Individuals authorized to conduct medical record reviews shall be identified.",
          },
          {
            id: "ims-6-d",
            code: "IMS.6.d",
            category: "Commitment",
            text: "Review of records is based on identified parameters.",
            interpretation:
              "Minimum parameters: timeliness, legibility, completeness. Additional: completeness of consent forms, missing final diagnosis, availability of operation notes.",
          },
          {
            id: "ims-6-e",
            code: "IMS.6.e",
            category: "Commitment",
            text: "Appropriate corrective and preventive measures are undertaken on deficiencies identified.",
            interpretation:
              "Deficiencies shall be corrected within a defined time and documented. Preventive actions shall be disseminated to relevant staff.",
          },
        ],
      },
    ],
  },
];

export const getTotalElements = () => {
  return chapters.reduce(
    (total, ch) =>
      total + ch.standards.reduce((s, std) => s + std.elements.length, 0),
    0
  );
};

export const getCoreElements = () => {
  return chapters.reduce(
    (total, ch) =>
      total +
      ch.standards.reduce(
        (s, std) => s + std.elements.filter((e) => e.category === "CORE").length,
        0
      ),
    0
  );
};

export const getChapterStats = (chapterId: string) => {
  const chapter = chapters.find((c) => c.id === chapterId);
  if (!chapter) return null;
  const allElements = chapter.standards.flatMap((s) => s.elements);
  return {
    total: allElements.length,
    core: allElements.filter((e) => e.category === "CORE").length,
    commitment: allElements.filter((e) => e.category === "Commitment").length,
    achievement: allElements.filter((e) => e.category === "Achievement").length,
    excellence: allElements.filter((e) => e.category === "Excellence").length,
  };
};

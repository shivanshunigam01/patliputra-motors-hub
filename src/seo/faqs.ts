export type FaqItem = { question: string; answer: string };

export const SEO_FAQS: Record<string, FaqItem[]> = {
  jcb: [
    { question: "JCB ki price kitni hai?", answer: "JCB ki price model aur configuration par depend karti hai. Exact on-road price ke liye Patliputra se free quotation lein." },
    { question: "EMI par JCB mil sakti hai?", answer: "Haan, EMI par JCB mil sakti hai. Bank aur NBFC partners ke through easy finance available hai." },
    { question: "Down payment kitna lagega?", answer: "Generally 10–30% down payment se process start hota hai. Profile aur machine type ke hisaab se exact amount decide hota hai." },
    { question: "Diesel average kitna hai?", answer: "Diesel average machine type, application aur operator skill par depend karta hai. Aapke kaam ke hisaab se realistic estimate milta hai." },
    { question: "Maintenance mehenga hai?", answer: "Genuine parts aur regular service se maintenance controlled rehta hai. Bihar service network fast support deta hai." },
    { question: "Spare parts easily mil jayenge?", answer: "Haan, genuine JCB spare parts Patliputra ke through easily milte hain." },
    { question: "Service kitni jaldi milegi?", answer: "Major districts mein quick service response milta hai — breakdown aur scheduled service dono." },
    { question: "Kaunsi JCB contractor ke liye best hai?", answer: "General contracting ke liye 3DX popular hai. Heavy digging ke liye excavator better ho sakta hai." },
    { question: "Used JCB lena sahi rahega?", answer: "Budget limited ho to certified used JCB accha option ho sakta hai — inspection ke baad." },
    { question: "Loan kitne din mein approve hota hai?", answer: "Documents complete hone par aksar kuch dinon mein decision aa jata hai." },
  ],
  "ashok-leyland": [
    { question: "Truck finance kaise hota hai?", answer: "KYC, business proof aur vehicle selection ke baad bank/NBFC evaluation hoti hai, phir disbursement." },
    { question: "Kaunsi gadi zyada mileage deti hai?", answer: "Mileage load, route aur maintenance par depend karta hai. Application ke hisaab se model suggest kiya jata hai." },
    { question: "Cement ke liye kaunsa truck best hai?", answer: "Cement ke liye sahi GVW aur cargo body wala truck choose karna best hota hai." },
    { question: "Sand business ke liye kaunsa tipper lena chahiye?", answer: "Capacity, tyre config aur route condition dekhkar tipper finalize kiya jata hai." },
    { question: "Insurance kitna aata hai?", answer: "Insurance IDV aur cover type par depend karta hai — estimate free milta hai." },
    { question: "Service interval kya hai?", answer: "Model aur usage ke hisaab se manufacturer schedule follow karna best practice hai." },
    { question: "RTO registration mein kitna time lagta hai?", answer: "Documents ready hone par process generally kuch dinon se kuch hafte tak complete hota hai." },
    { question: "Fitness kab karwana hota hai?", answer: "Commercial vehicles ke liye fitness validity ke hisaab se renew karwana zaroori hai." },
    { question: "Body banwane ka process kya hai?", answer: "Chassis ke baad cargo/tipper/bus body finalize karke approved builders se banwayi jati hai." },
    { question: "Resale value kaisi hai?", answer: "Bihar mein Ashok Leyland ki demand strong hai, isliye maintained trucks ki resale acchi rehti hai." },
  ],
  switch: [
    { question: "Electric bus profitable hai?", answer: "Route, energy cost, subsidy aur utilization se EV bus profitable ho sakti hai. ROI calculate karke dikhate hain." },
    { question: "Electric bus ki range kitni hoti hai?", answer: "Range model, load aur route profile par depend karti hai." },
    { question: "Charging infrastructure kaise set up karein?", answer: "Depot charging plan aur charger selection se setup hota hai — guidance milti hai." },
    { question: "Government subsidy milti hai?", answer: "Applicable EV schemes time-to-time change hoti hain; current benefits check karke bataya jata hai." },
    { question: "EV maintenance diesel se sasta hai?", answer: "Recurring mechanical costs generally kam hoti hain; authorized EV service recommended hai." },
    { question: "Electric LCV kis business ke liye best hai?", answer: "City logistics, milk aur last-mile delivery ke liye electric LCV strong fit ho sakti hai." },
  ],
  "used-jcb": [
    { question: "Second hand JCB lena safe hai?", answer: "Haan, agar certified inspection ho — engine, hydraulics aur hour meter check ke baad." },
    { question: "RC transfer kaise hoga?", answer: "Documents verify karke RTO transfer process follow hota hai; paperwork guidance milti hai." },
    { question: "Loan mil sakta hai?", answer: "Many financiers used equipment finance dete hain — machine age/condition ke basis par." },
    { question: "Machine check kaise karein?", answer: "Hour meter, undercarriage, boom play, hydraulic leakage aur engine smoke check karein." },
    { question: "Hour meter genuine kaise check karein?", answer: "Service records, wear patterns aur diagnostics se authenticity verify hoti hai." },
    { question: "Warranty milti hai?", answer: "Selected certified machines par limited assurance available ho sakti hai." },
    { question: "Engine health kaise check hoti hai?", answer: "Start-up, smoke, oil condition aur leak checks se engine health assess hoti hai." },
    { question: "Tyre condition kaise dekhein?", answer: "Tread, cracks, uneven wear aur age check karke replacement cost estimate kiya jata hai." },
    { question: "Hydraulic leakage kaise pehchanein?", answer: "Hose joints, cylinders aur ground oil spots se leakage identify hoti hai." },
    { question: "Certified machine kya hoti hai?", answer: "Jiska structured inspection, documentation aur dealer-backed quality check complete ho." },
  ],
  general: [
    { question: "Down payment kitna lagega?", answer: "Product aur finance partner ke hisaab se generally 10–30% se process start hota hai." },
    { question: "EMI calculator kaise use karein?", answer: "Price, down payment, tenure aur interest rate set karke monthly EMI instantly calculate karein." },
    { question: "Loan eligibility kaise check karein?", answer: "CIBIL, income/business proof aur KYC ke basis par eligibility guide ki jati hai." },
  ],
};

export function getFaqsForCategory(category?: string): FaqItem[] {
  if (!category) return SEO_FAQS.general;
  return SEO_FAQS[category] || SEO_FAQS.general;
}

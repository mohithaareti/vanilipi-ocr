export type TargetLanguage = 'telugu' | 'hindi' | 'tamil' | 'english';

export type LanguageOption = {
  value: TargetLanguage;
  label: string;
  nativeLabel: string;
  fontClass: string;
  bcp47: string;
  flag: string;
};

export type ProcessingStage =
  | 'idle'
  | 'uploading'
  | 'preprocessing'
  | 'ocr'
  | 'post-processing'
  | 'translating'
  | 'done';

export type ProcessStageInfo = {
  stage: ProcessingStage;
  label: string;
  description: string;
  icon: string;
  duration: number;
};

export const LANGUAGES: LanguageOption[] = [
  {
    value: 'telugu',
    label: 'Telugu',
    nativeLabel: 'తెలుగు',
    fontClass: 'font-telugu',
    bcp47: 'te-IN',
    flag: '🇮🇳',
  },
  {
    value: 'hindi',
    label: 'Hindi',
    nativeLabel: 'हिन्दी',
    fontClass: 'font-hindi',
    bcp47: 'hi-IN',
    flag: '🇮🇳',
  },
  {
    value: 'tamil',
    label: 'Tamil',
    nativeLabel: 'தமிழ்',
    fontClass: 'font-tamil',
    bcp47: 'ta-IN',
    flag: '🇮🇳',
  },
  {
    value: 'english',
    label: 'English',
    nativeLabel: 'English',
    fontClass: 'font-sans',
    bcp47: 'en-US',
    flag: '🇬🇧',
  },
];

export const PROCESS_STAGES: ProcessStageInfo[] = [
  {
    stage: 'uploading',
    label: 'Uploading Document',
    description: 'Securely transferring your file to the processing engine',
    icon: 'upload',
    duration: 600,
  },
  {
    stage: 'preprocessing',
    label: 'Image Preprocessing',
    description: 'Enhancing contrast, removing noise, deskewing',
    icon: 'image',
    duration: 1000,
  },
  {
    stage: 'ocr',
    label: 'OCR Extraction',
    description: 'Running deep learning text recognition model',
    icon: 'scan',
    duration: 1500,
  },
  {
    stage: 'post-processing',
    label: 'Text Post-Processing',
    description: 'Spell correction and layout reconstruction',
    icon: 'file-text',
    duration: 700,
  },
  {
    stage: 'translating',
    label: 'Neural Translation',
    description: 'Translating extracted text to target language',
    icon: 'languages',
    duration: 1100,
  },
];

export type SampleDocument = {
  id: string;
  title: string;
  description: string;
  category: string;
  englishText: string;
  translations: Record<TargetLanguage, string>;
};

export const SAMPLE_DOCUMENTS: SampleDocument[] = [
  {
    id: 'gov-scheme',
    title: 'Government Welfare Scheme Notice',
    description: 'Public distribution scheme announcement',
    category: 'Government',
    englishText: `Government of Andhra Pradesh
Public Distribution Scheme Notice

This notice is to inform all eligible citizens that the new food security scheme will commence from November 1st, 2024. Under this scheme, each eligible family will receive 5 kg of rice per member per month at no cost.

To apply for this scheme, please visit your nearest ration shop with the following documents:
1. Aadhaar Card of all family members
2. Ration Card
3. Bank passbook

The application deadline is October 15th, 2024. For any queries, please contact the toll-free helpline at 1800-425-1111.

This scheme aims to ensure food security for every household in the state. We request all citizens to take advantage of this initiative.

Commissioner, Civil Supplies Department`,
    translations: {
      telugu: `ఆంధ్రప్రదేశ్ ప్రభుత్వం
ప్రజా పంపిణీ పథకం నోటీసు

ఈ నోటీసు అందరు అర్హత కలిగిన పౌరులకు తెలియజేసేదిగా, కొత్త ఆహార భద్రతా పథకం 2024 నవంబర్ 1వ తేదీ నుండి ప్రారంభమవుతుంది. ఈ పథకం కింద, ప్రతి అర్హత కలిగిన కుటుంబానికి నెలకు ప్రతి సభ్యునికి 5 కిలోల బియ్యం ఉచితంగా అందించబడుతుంది.

ఈ పథకానికి దరఖాస్తు చేసుకోవడానికి, దయచేసి మీ సమీపంలోని రేషన్ దుకాణాన్ని ఈ క్రింది పత్రాలతో సందర్శించండి:
1. కుటుంబ సభ్యులందరి ఆధార్ కార్డు
2. రేషన్ కార్డు
3. బ్యాంకు పాస్‌బుక్

దరఖాస్తు చివరి తేదీ 2024 అక్టోబర్ 15. ఏవైనా సందేహాల కోసం, దయచేసి టోల్ ఫ్రీ హెల్ప్‌లైన్ 1800-425-1111 నంబర్‌లో సంప్రదించండి.

ఈ పథకం రాష్ట్రంలోని ప్రతి కుటుంబానికి ఆహార భద్రతను నిర్ధారించడానికి లక్ష్యంగా పెట్టుకుంది. అందరు పౌరులు ఈ చొరవ ప్రయోజనం పొందమని మేము అభ్యర్థిస్తున్నాము.

కమిషనర్, సివిల్ సప్లైస్ శాఖ`,
      hindi: `आंध्र प्रदेश सरकार
सार्वजनिक वितरण योजना सूचना

यह सूचना सभी पात्र नागरिकों को सूचित करने के लिए है कि नई खाद्य सुरक्षा योजना 1 नवंबर 2024 से शुरू होगी। इस योजना के तहत, प्रत्येक पात्र परिवार को प्रति सदस्य प्रति माह 5 किलो चावल निःशुल्क प्रदान किए जाएंगे।

इस योजना के लिए आवेदन करने के लिए, कृपया निम्नलिखित दस्तावेजों के साथ अपने निकटतम राशन की दुकान पर जाएं:
1. सभी परिवार के सदस्यों का आधार कार्ड
2. राशन कार्ड
3. बैंक पासबुक

आवेदन की अंतिम तिथि 15 अक्टूबर 2024 है। किसी भी प्रश्न के लिए, कृपया टोल फ्री हेल्पलाइन 1800-425-1111 पर संपर्क करें।

यह योजना राज्य के हर घर में खाद्य सुरक्षा सुनिश्चित करने का लक्ष्य रखती है। हम सभी नागरिकों से इस पहल का लाभ उठाने का अनुरोध करते हैं।

आयुक्त, सिविल सप्लाई विभाग`,
      tamil: `ஆந்திரப் பிரதேச அரசு
பொது விநியோகத் திட்ட அறிவிப்பு

இந்த அறிவிப்பு அனைத்து தகுதியான குடிமக்களுக்கும் தெரிவிக்கப்படுகிறது, புதிய உணவுப் பாதுகாப்புத் திட்டம் 2024 நவம்பர் 1 முதல் தொடங்கும். இந்தத் திட்டத்தின் கீழ், ஒவ்வொரு தகுதியான குடும்பத்திற்கும் மாதம் ஒன்றுக்கு ஒரு உறுப்பினருக்கு 5 கிலோ அரிசி இலவசமாக வழங்கப்படும்.

இந்தத் திட்டத்திற்கு விண்ணப்பிக்க, தயவுசெய்து பின்வரும் ஆவணங்களுடன் உங்கள் அருகிலுள்ள ரேஷன் கடைக்குச் செல்லவும்:
1. குடும்ப உறுப்பினர் அனைவரின் ஆதார் அட்டை
2. ரேஷன் அட்டை
3. வங்கி பாஸ்புக்

விண்ணப்பத்தின் கடைசி தேதி 2024 அக்டோபர் 15. ஏதேனும் கேள்விகளுக்கு, டோல் ஃப்ரீ ஹெல்ப்லைன் 1800-425-1111 ஐ தொடர்பு கொள்ளவும்.

இந்தத் திட்டம் மாநிலத்தில் உள்ள ஒவ்வொரு குடும்பத்திற்கும் உணவுப் பாதுகாப்பை உறுதி செய்வதை நோக்கமாகக் கொண்டுள்ளது. அனைத்து குடிமக்களும் இந்தத் திட்டத்தின் பயனைப் பெற அழைக்கிறோம்.

ஆணையாளர், சிவில் சப்ளைஸ் துறை`,
      english: `Government of Andhra Pradesh
Public Distribution Scheme Notice

This notice is to inform all eligible citizens that the new food security scheme will commence from November 1st, 2024. Under this scheme, each eligible family will receive 5 kg of rice per member per month at no cost.

To apply for this scheme, please visit your nearest ration shop with the following documents:
1. Aadhaar Card of all family members
2. Ration Card
3. Bank passbook

The application deadline is October 15th, 2024. For any queries, please contact the toll-free helpline at 1800-425-1111.

This scheme aims to ensure food security for every household in the state. We request all citizens to take advantage of this initiative.

Commissioner, Civil Supplies Department`,
    },
  },
  {
    id: 'medical-report',
    title: 'Medical Prescription Report',
    description: 'Patient diagnosis and treatment summary',
    category: 'Healthcare',
    englishText: `MEDICAL REPORT - City Hospital

Patient Name: Ramesh Kumar
Age: 45 years
Date of Visit: October 10, 2024

DIAGNOSIS:
Type 2 Diabetes Mellitus with mild hypertension

PRESCRIBED MEDICATIONS:
1. Metformin 500mg - Twice daily after meals
2. Amlodipine 5mg - Once daily in the morning
3. Aspirin 75mg - Once daily after breakfast

DIETARY ADVICE:
- Avoid sugary foods and beverages
- Include more vegetables and fiber in diet
- Limit salt intake to less than 5 grams per day
- Maintain regular meal timings

FOLLOW-UP:
Please visit again after 4 weeks for a review of blood sugar levels and blood pressure monitoring. Fasting blood test required before next visit.

Dr. Suresh Reddy, MD (General Medicine)
Reg. No: AP-12345`,
    translations: {
      telugu: `వైద్య నివేదిక - సిటీ హాస్పిటల్

రోగి పేరు: రమేష్ కుమార్
వయస్సు: 45 సంవత్సరాలు
సందర్శన తేదీ: 2024 అక్టోబర్ 10

రోగ నిర్ధారణ:
మైల్డ్ హైపర్‌టెన్షన్‌తో కూడిన టైప్ 2 డయాబెటిస్ మెల్లిటస్

సూచించబడిన మందులు:
1. మెట్‌ఫార్మిన్ 500mg - రోజుకు రెండుసార్లు భోజనం తర్వాత
2. ఆమ్లోడిపిన్ 5mg - ఉదయం ఒకసారి
3. యాస్పిరిన్ 75mg - అల్పాహారం తర్వాత ఒకసారి

ఆహార సలహాలు:
- తీపి ఆహారాలు మరియు పానీయాలను నివారించండి
- ఆహారంలో ఎక్కువ కూరగాయలు మరియు ఫైబర్ చేర్చండి
- ఉప్పు తీసుకోవడాన్ని రోజుకు 5 గ్రాముల కంటే తక్కువగా పరిమితి చేయండి
- క్రమం తప్పక భోజన సమయాలను పాటించండి

తదుపరి సందర్శన:
రక్తంలో చక్కెర స్థాయిలు మరియు రక్తపోటు పర్యవేక్షణ సమీక్ష కోసం 4 వారాల తర్వాత మళ్ళీ సందర్శించండి. తదుపరి సందర్శనకు ముందు ఉపవాస రక్త పరీక్ష అవసరం.

డా. సురేష్ రెడ్డి, MD (జనరల్ మెడిసిన్)
రెగ్. నం: AP-12345`,
      hindi: `चिकित्सा रिपोर्ट - सिटी अस्पताल

रोगी का नाम: रमेश कुमार
आयु: 45 वर्ष
जांच की तिथि: 10 अक्टूबर 2024

निदान:
माइल्ड हाइपरटेंशन के साथ टाइप 2 डायबिटीज मेलिटस

निर्धारित दवाएं:
1. मेटफॉर्मिन 500mg - भोजन के बाद दिन में दो बार
2. एम्लोडिपिन 5mg - सुबह एक बार
3. एस्पिरिन 75mg - नाश्ते के बाद एक बार

आहार संबंधी सलाह:
- मीठे खाद्य पदार्थ और पेय पदार्थों से बचें
- आहार में अधिक सब्जियां और फाइबर शामिल करें
- नमक का सेवन प्रतिदिन 5 ग्राम से कम तक सीमित करें
- नियमित भोजन के समय का पालन करें

अनुवर्ती जांच:
रक्त शर्करा स्तर और रक्तचाप निगरानी की समीक्षा के लिए 4 सप्ताह बाद पुनः आएं। अगली जांच से पहले उपवास रक्त परीक्षण आवश्यक है।

डॉ. सुरेश रेड्डी, MD (जनरल मेडिसिन)
रजिस्ट्रेशन नंबर: AP-12345`,
      tamil: `மருத்துவ அறிக்கை - சிட்டி ஹாஸ்பிடல்

நோயாளியின் பெயர்: ரமேஷ் குமார்
வயது: 45 வயது
சிகிச்சை தேதி: 2024 அக்டோபர் 10

நோய் கண்டறிதல்:
மைல்ட் ஹைபர்டென்ஷனுடன் டைப் 2 டயாபிடிஸ் மெலிடஸ்

பரிந்துரைக்கப்பட்ட மருந்துகள்:
1. மெட்ஃபார்மின் 500mg - உணவுக்குப் பிறகு தினமும் இருமுறை
2. அம்லோடிபின் 5mg - காலையில் ஒருமுறை
3. ஆஸ்பிரின் 75mg - காலை உணவுக்குப் பிறகு ஒருமுறை

உணவு ஆலோசனை:
- இனிபு உணவுகள் மற்றும் பானங்களைத் தவிர்க்கவும்
- உணவில் அதிக காய்கறிகள் மற்றும் ஃபைபரைச் சேர்க்கவும்
- உப்பு உட்கொள்ளலை தினமும் 5 கிராமுக்கும் குறைவாக கட்டுப்படுத்தவும்
- ஒழுங்கான உணவு நேரங்களை பின்பற்றவும்

அடுத்த சிகிச்சை:
இரத்த சர்க்கரை அளவு மற்றும் இரத்த அழுத்த கண்காணிப்பு மதிப்பாய்வுக்கு 4 வாரங்கள் கழித்து மீண்டும் வரவும். அடுத்த சிகிச்சைக்கு முன் உணவு உண்ணா இரத்த பரிசோதனை தேவை.

டாக்டர் சுரேஷ் ரெட்டி, MD (ஜெனரல் மெடிசின்)
பதிவு எண்: AP-12345`,
      english: `MEDICAL REPORT - City Hospital

Patient Name: Ramesh Kumar
Age: 45 years
Date of Visit: October 10, 2024

DIAGNOSIS:
Type 2 Diabetes Mellitus with mild hypertension

PRESCRIBED MEDICATIONS:
1. Metformin 500mg - Twice daily after meals
2. Amlodipine 5mg - Once daily in the morning
3. Aspirin 75mg - Once daily after breakfast

DIETARY ADVICE:
- Avoid sugary foods and beverages
- Include more vegetables and fiber in diet
- Limit salt intake to less than 5 grams per day
- Maintain regular meal timings

FOLLOW-UP:
Please visit again after 4 weeks for a review of blood sugar levels and blood pressure monitoring. Fasting blood test required before next visit.

Dr. Suresh Reddy, MD (General Medicine)
Reg. No: AP-12345`,
    },
  },
  {
    id: 'education-notice',
    title: 'School Education Circular',
    description: 'Annual examination and parent meeting notice',
    category: 'Education',
    englishText: `ST. MARY'S HIGH SCHOOL
Annual Examination & Parent-Teacher Meeting Circular

Dear Parents,

This is to inform you that the Annual Examinations for the academic year 2024-25 will be conducted from December 2nd to December 12th, 2024. The detailed timetable has been sent with this circular.

Examination Schedule:
- December 2: English
- December 4: Mathematics
- December 6: Science
- December 9: Social Studies
- December 11: Language (Telugu/Hindi/Tamil)

Reporting time: 8:30 AM. Examinations will begin at 9:00 AM sharp. Students must bring their own stationery and admit cards.

Parent-Teacher Meeting:
A parent-teacher meeting is scheduled on December 20th, 2024 from 10:00 AM to 1:00 PM to discuss examination results and student progress.

We request all parents to ensure their children attend all examinations regularly and reach the school on time.

Principal
St. Mary's High School`,
    translations: {
      telugu: `సెయింట్ మేరీస్ హై స్కూల్
వార్షిక పరీక్షలు & తలిదండ్రుల-ఉపాధ్యాయుల సమావేశ సర్క్యులర్

ప్రియమైన తల్లిదండ్రులారా,

2024-25 విద్యా సంవత్సరం వార్షిక పరీక్షలు 2024 డిసెంబర్ 2 నుండి డిసెంబర్ 12 వరకు నిర్వహించబడతాయని తెలియజేస్తున్నాము. వివరణాత్మక షెడ్యూల్ ఈ సర్క్యులర్‌తో పంపబడింది.

పరీక్షల షెడ్యూల్:
- డిసెంబర్ 2: ఇంగ్లీష్
- డిసెంబర్ 4: గణితం
- డిసెంబర్ 6: సైన్స్
- డిసెంబర్ 9: సోషల్ స్టడీస్
- డిసెంబర్ 11: భాష (తెలుగు/హిందీ/తమిళం)

రిపోర్టింగ్ సమయం: ఉదయం 8:30. పరీక్షలు ఉదయం 9:00 గంటలకు ఖచ్చితంగా ప్రారంభమవుతాయి. విద్యార్థులు తమ స్టేషనరీ మరియు అడ్మిట్ కార్డులను తీసుకురావాలి.

తల్లిదండ్రుల-ఉపాధ్యాయుల సమావేశం:
పరీక్షా ఫలితాలు మరియు విద్యార్థి పురోగతిని చర్చించడానికి 2024 డిసెంబర్ 20న ఉదయం 10:00 నుండి మధ్యాహ్నం 1:00 వరకు తల్లిదండ్రుల-ఉపాధ్యాయుల సమావేశం నిర్ణీతమైంది.

అన్ని పరీక్షలకు వారి పిల్లలు క్రమం తప్పక హాజరు కావడాన్ని మరియు సమయానికి స్కూల్‌కు చేరుకోవడాన్ని నిర్ధారించమని మేము అందరు తల్లిదండ్రులను అభ్యర్థిస్తున్నాము.

ప్రిన్సిపాల్
సెయింట్ మేరీస్ హై స్కూల్`,
      hindi: `सेंट मैरीज़ हाई स्कूल
वार्षिक परीक्षा एवं अभिभावक-शिक्षक बैठक परिपत्र

प्रिय अभिभावकों,

यह आपको सूचित करने के लिए है कि शैक्षणिक वर्ष 2024-25 की वार्षिक परीक्षाएँ 2 दिसंबर से 12 दिसंबर 2024 तक आयोजित की जाएंगी। विस्तृत समयसारणी इस परिपत्र के साथ भेजी गई है।

परीक्षा कार्यक्रम:
- 2 दिसंबर: अंग्रेजी
- 4 दिसंबर: गणित
- 6 दिसंबर: विज्ञान
- 9 दिसंबर: सामाजिक अध्ययन
- 11 दिसंबर: भाषा (तेलुगु/हिंदी/तमिल)

रिपोर्टिंग समय: सुबह 8:30। परीक्षाएँ सुबह 9:00 बजे शुरू होंगी। छात्रों को अपना स्टेशनरी और प्रवेश पत्र साथ लाना होगा।

अभिभावक-शिक्षक बैठक:
परीक्षा परिणामों और छात्र प्रगति पर चर्चा के लिए 20 दिसंबर 2024 को सुबह 10:00 से दोपहर 1:00 तक अभिभावक-शिक्षक बैठक निर्धारित है।

हम सभी अभिभावकों से अनुरोध है कि वे सुनिश्चित करें कि उनके बच्चे सभी परीक्षाओं में नियमित रूप से उपस्थित हों और समय पर स्कूल पहुंचें।

प्रधानाध्यापक
सेंट मैरीज़ हाई स्कूल`,
      tamil: `புனித மேரிஸ் ஹை ஸ்கூல்
வருடாந்திர தேர்வு & பெற்றோர்-ஆசிரியர் கூட்டம் சுற்றறிக்கை

அன்புள்ள பெற்றோர்களே,

2024-25 கல்வியாண்டிற்கான வருடாந்திர தேர்வுகள் 2024 டிசம்பர் 2 முதல் டிசம்பர் 12 வரை நடைபெறும் என்பதை தெரிவிக்கிறோம். விரிவான நேர அட்டவணை இந்தச் சுற்றறிக்கையுடன் அனுப்பப்பட்டுள்ளது.

தேர்வு அட்டவணை:
- டிசம்பர் 2: ஆங்கிலம்
- டிசம்பர் 4: கணிதம்
- டிசம்பர் 6: அறிவியல்
- டிசம்பர் 9: சமூக அறிவியல்
- டிசம்பர் 11: மொழி (தெலுங்கு/இந்தி/தமிழ்)

வருகை நேரம்: காலை 8:30. தேர்வுகள் காலை 9:00 மணிக்கு கட்டாயம் தொடங்கும். மாணவர்கள் தங்கள் எழுதுபொருட்கள் மற்றும் அனுமதி அட்டையை கொண்டு வர வேண்டும்.

பெற்றோர்-ஆசிரியர் கூட்டம்:
தேர்வு முடிவுகள் மற்றும் மாணவர் முன்னேற்றம் பற்றி விவாதிக்க 2024 டிசம்பர் 20 அன்று காலை 10:00 முதல் மதியம் 1:00 வரை பெற்றோர்-ஆசிரியர் கூட்டம் திட்டமிடப்பட்டுள்ளது.

அனைத்து பெற்றோர்களும் தங்கள் குழந்தைகள் அனைத்து தேர்வுகளிலும் தவறாமல் கலந்துகொள்வதையும், சரியான நேரத்தில் பள்ளிக்கு வருவதையும் உறுதி செய்ய கேட்டுக்கொள்கிறோம்.

அதிபர்
புனித மேரிஸ் ஹை ஸ்கூல்`,
      english: `ST. MARY'S HIGH SCHOOL
Annual Examination & Parent-Teacher Meeting Circular

Dear Parents,

This is to inform you that the Annual Examinations for the academic year 2024-25 will be conducted from December 2nd to December 12th, 2024. The detailed timetable has been sent with this circular.

Examination Schedule:
- December 2: English
- December 4: Mathematics
- December 6: Science
- December 9: Social Studies
- December 11: Language (Telugu/Hindi/Tamil)

Reporting time: 8:30 AM. Examinations will begin at 9:00 AM sharp. Students must bring their own stationery and admit cards.

Parent-Teacher Meeting:
A parent-teacher meeting is scheduled on December 20th, 2024 from 10:00 AM to 1:00 PM to discuss examination results and student progress.

We request all parents to ensure their children attend all examinations regularly and reach the school on time.

Principal
St. Mary's High School`,
    },
  },
];

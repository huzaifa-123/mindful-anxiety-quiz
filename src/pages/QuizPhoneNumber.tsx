import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuizAnswers } from "../context/QuizAnswersContext";
import Header from "../components/Header";

// Comprehensive country data with flags, names, and codes
const countries = [
  { code: "+93", name: "Afghanistan", flag: "🇦🇫" },
  { code: "+355", name: "Albania", flag: "🇦🇱" },
  { code: "+213", name: "Algeria", flag: "🇩🇿" },
  { code: "+1-684", name: "American Samoa", flag: "🇦🇸" },
  { code: "+376", name: "Andorra", flag: "🇦🇩" },
  { code: "+244", name: "Angola", flag: "🇦🇴" },
  { code: "+1-264", name: "Anguilla", flag: "🇦🇮" },
  { code: "+672", name: "Antarctica", flag: "🇦🇶" },
  { code: "+1-268", name: "Antigua and Barbuda", flag: "🇦🇬" },
  { code: "+54", name: "Argentina", flag: "🇦🇷" },
  { code: "+374", name: "Armenia", flag: "🇦🇲" },
  { code: "+297", name: "Aruba", flag: "🇦🇼" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+43", name: "Austria", flag: "🇦🇹" },
  { code: "+994", name: "Azerbaijan", flag: "🇦🇿" },
  { code: "+1-242", name: "Bahamas", flag: "🇧🇸" },
  { code: "+973", name: "Bahrain", flag: "🇧🇭" },
  { code: "+880", name: "Bangladesh", flag: "🇧🇩" },
  { code: "+1-246", name: "Barbados", flag: "🇧🇧" },
  { code: "+375", name: "Belarus", flag: "🇧🇾" },
  { code: "+32", name: "Belgium", flag: "🇧🇪" },
  { code: "+501", name: "Belize", flag: "🇧🇿" },
  { code: "+229", name: "Benin", flag: "🇧🇯" },
  { code: "+1-441", name: "Bermuda", flag: "🇧🇲" },
  { code: "+975", name: "Bhutan", flag: "🇧🇹" },
  { code: "+591", name: "Bolivia", flag: "🇧🇴" },
  { code: "+387", name: "Bosnia and Herzegovina", flag: "🇧🇦" },
  { code: "+267", name: "Botswana", flag: "🇧🇼" },
  { code: "+55", name: "Brazil", flag: "🇧🇷" },
  { code: "+246", name: "British Indian Ocean Territory", flag: "🇮🇴" },
  { code: "+1-284", name: "British Virgin Islands", flag: "🇻🇬" },
  { code: "+673", name: "Brunei", flag: "🇧🇳" },
  { code: "+359", name: "Bulgaria", flag: "🇧🇬" },
  { code: "+226", name: "Burkina Faso", flag: "🇧🇫" },
  { code: "+257", name: "Burundi", flag: "🇧🇮" },
  { code: "+855", name: "Cambodia", flag: "🇰🇭" },
  { code: "+237", name: "Cameroon", flag: "🇨🇲" },
  { code: "+1", name: "Canada", flag: "🇨🇦" },
  { code: "+238", name: "Cape Verde", flag: "🇨🇻" },
  { code: "+1-345", name: "Cayman Islands", flag: "🇰🇾" },
  { code: "+236", name: "Central African Republic", flag: "🇨🇫" },
  { code: "+235", name: "Chad", flag: "🇹🇩" },
  { code: "+56", name: "Chile", flag: "🇨🇱" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+61", name: "Christmas Island", flag: "🇨🇽" },
  { code: "+61", name: "Cocos Islands", flag: "🇨🇨" },
  { code: "+57", name: "Colombia", flag: "🇨🇴" },
  { code: "+269", name: "Comoros", flag: "🇰🇲" },
  { code: "+682", name: "Cook Islands", flag: "🇨🇰" },
  { code: "+506", name: "Costa Rica", flag: "🇨🇷" },
  { code: "+385", name: "Croatia", flag: "🇭🇷" },
  { code: "+53", name: "Cuba", flag: "🇨🇺" },
  { code: "+599", name: "Curacao", flag: "🇨🇼" },
  { code: "+357", name: "Cyprus", flag: "🇨🇾" },
  { code: "+420", name: "Czech Republic", flag: "🇨🇿" },
  { code: "+243", name: "Democratic Republic of the Congo", flag: "🇨🇩" },
  { code: "+45", name: "Denmark", flag: "🇩🇰" },
  { code: "+253", name: "Djibouti", flag: "🇩🇯" },
  { code: "+1-767", name: "Dominica", flag: "🇩🇲" },
  { code: "+1-809", name: "Dominican Republic", flag: "🇩🇴" },
  { code: "+670", name: "East Timor", flag: "🇹🇱" },
  { code: "+593", name: "Ecuador", flag: "🇪🇨" },
  { code: "+20", name: "Egypt", flag: "🇪🇬" },
  { code: "+503", name: "El Salvador", flag: "🇸🇻" },
  { code: "+240", name: "Equatorial Guinea", flag: "🇬🇶" },
  { code: "+291", name: "Eritrea", flag: "🇪🇷" },
  { code: "+372", name: "Estonia", flag: "🇪🇪" },
  { code: "+251", name: "Ethiopia", flag: "🇪🇹" },
  { code: "+500", name: "Falkland Islands", flag: "🇫🇰" },
  { code: "+298", name: "Faroe Islands", flag: "🇫🇴" },
  { code: "+679", name: "Fiji", flag: "🇫🇯" },
  { code: "+358", name: "Finland", flag: "🇫🇮" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+689", name: "French Polynesia", flag: "🇵🇫" },
  { code: "+241", name: "Gabon", flag: "🇬🇦" },
  { code: "+220", name: "Gambia", flag: "🇬🇲" },
  { code: "+995", name: "Georgia", flag: "🇬🇪" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+233", name: "Ghana", flag: "🇬🇭" },
  { code: "+350", name: "Gibraltar", flag: "🇬🇮" },
  { code: "+30", name: "Greece", flag: "🇬🇷" },
  { code: "+299", name: "Greenland", flag: "🇬🇱" },
  { code: "+1-473", name: "Grenada", flag: "🇬🇩" },
  { code: "+1-671", name: "Guam", flag: "🇬🇺" },
  { code: "+502", name: "Guatemala", flag: "🇬🇹" },
  { code: "+44-1481", name: "Guernsey", flag: "🇬🇬" },
  { code: "+224", name: "Guinea", flag: "🇬🇳" },
  { code: "+245", name: "Guinea-Bissau", flag: "🇬🇼" },
  { code: "+592", name: "Guyana", flag: "🇬🇾" },
  { code: "+509", name: "Haiti", flag: "🇭🇹" },
  { code: "+504", name: "Honduras", flag: "🇭🇳" },
  { code: "+852", name: "Hong Kong", flag: "🇭🇰" },
  { code: "+36", name: "Hungary", flag: "🇭🇺" },
  { code: "+354", name: "Iceland", flag: "🇮🇸" },
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+62", name: "Indonesia", flag: "🇮🇩" },
  { code: "+98", name: "Iran", flag: "🇮🇷" },
  { code: "+964", name: "Iraq", flag: "🇮🇶" },
  { code: "+353", name: "Ireland", flag: "🇮🇪" },
  { code: "+44-1624", name: "Isle of Man", flag: "🇮🇲" },
  { code: "+972", name: "Israel", flag: "🇮🇱" },
  { code: "+39", name: "Italy", flag: "🇮🇹" },
  { code: "+225", name: "Ivory Coast", flag: "🇨🇮" },
  { code: "+1-876", name: "Jamaica", flag: "🇯🇲" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "+44-1534", name: "Jersey", flag: "🇯🇪" },
  { code: "+962", name: "Jordan", flag: "🇯🇴" },
  { code: "+7", name: "Kazakhstan", flag: "🇰🇿" },
  { code: "+254", name: "Kenya", flag: "🇰🇪" },
  { code: "+686", name: "Kiribati", flag: "🇰🇮" },
  { code: "+383", name: "Kosovo", flag: "🇽🇰" },
  { code: "+965", name: "Kuwait", flag: "🇰🇼" },
  { code: "+996", name: "Kyrgyzstan", flag: "🇰🇬" },
  { code: "+856", name: "Laos", flag: "🇱🇦" },
  { code: "+371", name: "Latvia", flag: "🇱🇻" },
  { code: "+961", name: "Lebanon", flag: "🇱🇧" },
  { code: "+266", name: "Lesotho", flag: "🇱🇸" },
  { code: "+231", name: "Liberia", flag: "🇱🇷" },
  { code: "+218", name: "Libya", flag: "🇱🇾" },
  { code: "+423", name: "Liechtenstein", flag: "🇱🇮" },
  { code: "+370", name: "Lithuania", flag: "🇱🇹" },
  { code: "+352", name: "Luxembourg", flag: "🇱🇺" },
  { code: "+853", name: "Macau", flag: "🇲🇴" },
  { code: "+389", name: "Macedonia", flag: "🇲🇰" },
  { code: "+261", name: "Madagascar", flag: "🇲🇬" },
  { code: "+265", name: "Malawi", flag: "🇲🇼" },
  { code: "+60", name: "Malaysia", flag: "🇲🇾" },
  { code: "+960", name: "Maldives", flag: "🇲🇻" },
  { code: "+223", name: "Mali", flag: "🇲🇱" },
  { code: "+356", name: "Malta", flag: "🇲🇹" },
  { code: "+692", name: "Marshall Islands", flag: "🇲🇭" },
  { code: "+222", name: "Mauritania", flag: "🇲🇷" },
  { code: "+230", name: "Mauritius", flag: "🇲🇺" },
  { code: "+262", name: "Mayotte", flag: "🇾🇹" },
  { code: "+52", name: "Mexico", flag: "🇲🇽" },
  { code: "+691", name: "Micronesia", flag: "🇫🇲" },
  { code: "+373", name: "Moldova", flag: "🇲🇩" },
  { code: "+377", name: "Monaco", flag: "🇲🇨" },
  { code: "+976", name: "Mongolia", flag: "🇲🇳" },
  { code: "+382", name: "Montenegro", flag: "🇲🇪" },
  { code: "+1-664", name: "Montserrat", flag: "🇲🇸" },
  { code: "+212", name: "Morocco", flag: "🇲🇦" },
  { code: "+258", name: "Mozambique", flag: "🇲🇿" },
  { code: "+95", name: "Myanmar", flag: "🇲🇲" },
  { code: "+264", name: "Namibia", flag: "🇳🇦" },
  { code: "+674", name: "Nauru", flag: "🇳🇷" },
  { code: "+977", name: "Nepal", flag: "🇳🇵" },
  { code: "+31", name: "Netherlands", flag: "🇳🇱" },
  { code: "+599", name: "Netherlands Antilles", flag: "🇦🇳" },
  { code: "+687", name: "New Caledonia", flag: "🇳🇨" },
  { code: "+64", name: "New Zealand", flag: "🇳🇿" },
  { code: "+505", name: "Nicaragua", flag: "🇳🇮" },
  { code: "+227", name: "Niger", flag: "🇳🇪" },
  { code: "+234", name: "Nigeria", flag: "🇳🇬" },
  { code: "+683", name: "Niue", flag: "🇳🇺" },
  { code: "+850", name: "North Korea", flag: "🇰🇵" },
  { code: "+1-670", name: "Northern Mariana Islands", flag: "🇲🇵" },
  { code: "+47", name: "Norway", flag: "🇳🇴" },
  { code: "+968", name: "Oman", flag: "🇴🇲" },
  { code: "+92", name: "Pakistan", flag: "🇵🇰" },
  { code: "+680", name: "Palau", flag: "🇵🇼" },
  { code: "+970", name: "Palestine", flag: "🇵🇸" },
  { code: "+507", name: "Panama", flag: "🇵🇦" },
  { code: "+675", name: "Papua New Guinea", flag: "🇵🇬" },
  { code: "+595", name: "Paraguay", flag: "🇵🇾" },
  { code: "+51", name: "Peru", flag: "🇵🇪" },
  { code: "+63", name: "Philippines", flag: "🇵🇭" },
  { code: "+64", name: "Pitcairn", flag: "🇵🇳" },
  { code: "+48", name: "Poland", flag: "🇵🇱" },
  { code: "+351", name: "Portugal", flag: "🇵🇹" },
  { code: "+1-787", name: "Puerto Rico", flag: "🇵🇷" },
  { code: "+974", name: "Qatar", flag: "🇶🇦" },
  { code: "+242", name: "Republic of the Congo", flag: "🇨🇬" },
  { code: "+262", name: "Reunion", flag: "🇷🇪" },
  { code: "+40", name: "Romania", flag: "🇷🇴" },
  { code: "+7", name: "Russia", flag: "🇷🇺" },
  { code: "+250", name: "Rwanda", flag: "🇷🇼" },
  { code: "+590", name: "Saint Barthelemy", flag: "🇧🇱" },
  { code: "+290", name: "Saint Helena", flag: "🇸🇭" },
  { code: "+1-869", name: "Saint Kitts and Nevis", flag: "🇰🇳" },
  { code: "+1-758", name: "Saint Lucia", flag: "🇱🇨" },
  { code: "+590", name: "Saint Martin", flag: "🇲🇫" },
  { code: "+508", name: "Saint Pierre and Miquelon", flag: "🇵🇲" },
  { code: "+1-784", name: "Saint Vincent and the Grenadines", flag: "🇻🇨" },
  { code: "+685", name: "Samoa", flag: "🇼🇸" },
  { code: "+378", name: "San Marino", flag: "🇸🇲" },
  { code: "+239", name: "Sao Tome and Principe", flag: "🇸🇹" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+221", name: "Senegal", flag: "🇸🇳" },
  { code: "+381", name: "Serbia", flag: "🇷🇸" },
  { code: "+248", name: "Seychelles", flag: "🇸🇨" },
  { code: "+232", name: "Sierra Leone", flag: "🇸🇱" },
  { code: "+65", name: "Singapore", flag: "🇸🇬" },
  { code: "+1-721", name: "Sint Maarten", flag: "🇸🇽" },
  { code: "+421", name: "Slovakia", flag: "🇸🇰" },
  { code: "+386", name: "Slovenia", flag: "🇸🇮" },
  { code: "+677", name: "Solomon Islands", flag: "🇸🇧" },
  { code: "+252", name: "Somalia", flag: "🇸🇴" },
  { code: "+27", name: "South Africa", flag: "🇿🇦" },
  { code: "+82", name: "South Korea", flag: "🇰🇷" },
  { code: "+211", name: "South Sudan", flag: "🇸🇸" },
  { code: "+34", name: "Spain", flag: "🇪🇸" },
  { code: "+94", name: "Sri Lanka", flag: "🇱🇰" },
  { code: "+249", name: "Sudan", flag: "🇸🇩" },
  { code: "+597", name: "Suriname", flag: "🇸🇷" },
  { code: "+47", name: "Svalbard and Jan Mayen", flag: "🇸🇯" },
  { code: "+268", name: "Swaziland", flag: "🇸🇿" },
  { code: "+46", name: "Sweden", flag: "🇸🇪" },
  { code: "+41", name: "Switzerland", flag: "🇨🇭" },
  { code: "+963", name: "Syria", flag: "🇸🇾" },
  { code: "+886", name: "Taiwan", flag: "🇹🇼" },
  { code: "+992", name: "Tajikistan", flag: "🇹🇯" },
  { code: "+255", name: "Tanzania", flag: "🇹🇿" },
  { code: "+66", name: "Thailand", flag: "🇹🇭" },
  { code: "+228", name: "Togo", flag: "🇹🇬" },
  { code: "+690", name: "Tokelau", flag: "🇹🇰" },
  { code: "+676", name: "Tonga", flag: "🇹🇴" },
  { code: "+1-868", name: "Trinidad and Tobago", flag: "🇹🇹" },
  { code: "+216", name: "Tunisia", flag: "🇹🇳" },
  { code: "+90", name: "Turkey", flag: "🇹🇷" },
  { code: "+993", name: "Turkmenistan", flag: "🇹🇲" },
  { code: "+1-649", name: "Turks and Caicos Islands", flag: "🇹🇨" },
  { code: "+688", name: "Tuvalu", flag: "🇹🇻" },
  { code: "+1-340", name: "U.S. Virgin Islands", flag: "🇻🇮" },
  { code: "+256", name: "Uganda", flag: "🇺🇬" },
  { code: "+380", name: "Ukraine", flag: "🇺🇦" },
  { code: "+971", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+1", name: "United States", flag: "🇺🇸" },
  { code: "+598", name: "Uruguay", flag: "🇺🇾" },
  { code: "+998", name: "Uzbekistan", flag: "🇺🇿" },
  { code: "+678", name: "Vanuatu", flag: "🇻🇺" },
  { code: "+379", name: "Vatican", flag: "🇻🇦" },
  { code: "+58", name: "Venezuela", flag: "🇻🇪" },
  { code: "+84", name: "Vietnam", flag: "🇻🇳" },
  { code: "+681", name: "Wallis and Futuna", flag: "🇼🇫" },
  { code: "+212", name: "Western Sahara", flag: "🇪🇭" },
  { code: "+967", name: "Yemen", flag: "🇾🇪" },
  { code: "+260", name: "Zambia", flag: "🇿🇲" },
  { code: "+263", name: "Zimbabwe", flag: "🇿🇼" },
];

// Auto-detect country based on timezone/locale
const detectCountry = () => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const locale = navigator.language || 'en-US';
    
    // Simple detection based on common patterns
    if (timezone.includes('London') || locale.includes('GB')) return countries.find(c => c.name === 'United Kingdom');
    if (timezone.includes('New_York') || timezone.includes('Chicago') || timezone.includes('Los_Angeles') || locale.includes('US')) return countries.find(c => c.name === 'United States');
    if (timezone.includes('Toronto') || locale.includes('CA')) return countries.find(c => c.name === 'Canada');
    if (timezone.includes('Paris') || locale.includes('FR')) return countries.find(c => c.name === 'France');
    if (timezone.includes('Berlin') || locale.includes('DE')) return countries.find(c => c.name === 'Germany');
    if (timezone.includes('Rome') || locale.includes('IT')) return countries.find(c => c.name === 'Italy');
    if (timezone.includes('Madrid') || locale.includes('ES')) return countries.find(c => c.name === 'Spain');
    if (timezone.includes('Amsterdam') || locale.includes('NL')) return countries.find(c => c.name === 'Netherlands');
    if (timezone.includes('Sydney') || locale.includes('AU')) return countries.find(c => c.name === 'Australia');
    
    // Default to UK
    return countries.find(c => c.name === 'United Kingdom');
  } catch {
    return countries.find(c => c.name === 'United Kingdom');
  }
};

const QuizPhoneNumber = () => {
  const navigate = useNavigate();
  const { setAnswer } = useQuizAnswers();
  const [phone, setPhone] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(detectCountry() || countries[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Format phone number as 03XX-XXXXXXX
  const formatPhoneNumber = (value: string): string => {
    return value.replace(/\s+/g, ''); // Keep '+' and digits, just remove spaces
  };
  
  // Validate number in E.164 format: +<country code><number>, up to 15 digits total
  const isValidPhoneNumber = (value: string): boolean => {
    if (/[a-zA-Z]/.test(value)) {
      return false;
    }
    return value.length >= 8;
  };

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.includes(searchTerm)
  );

  // Handle the first button (send hypnosis track)
  const handleSendTrack = (e: React.FormEvent) => {
    e.preventDefault();

    const fullPhoneNumber = selectedCountry.code + phone;
    if (!isValidPhoneNumber(phone)) {
      alert("Please enter a valid phone number");
      return;
    }

    setAnswer("phone", fullPhoneNumber);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      navigate("/quiz/anxiety-profile");
    }, 3000);
  };

  // Handle the skip button
  const handleSkip = () => {
    setTimeout(() => navigate("/quiz/anxiety-profile"), 200);
  };

  return (
    <div className="min-h-screen flex flex-col font-inter bg-flourishwhite">
      <div className="w-full sticky top-0 z-10">
        <Header withBack />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {showPopup && (
          <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-flourishmint text-white text-base font-semibold px-8 py-4 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in">
              <svg
                className="w-6 h-6 text-white mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              You will receive your hypnosis track shortly
            </div>
          </div>
        )}

        <div className="w-full max-w-lg mx-auto text-center">
          <h1 className="font-bold text-2xl text-gray-900 mb-4">
            Want a Free Hypnosis Track Sent Straight to Your Phone?
          </h1>
          <p className="text-gray-700 text-base mb-8 leading-relaxed">
            Enter your mobile number below to download a calming hypnosis audio designed to
            ease anxiety. Keep it on your phone and listen whenever you need a moment of calm.
          </p>
          <form onSubmit={handleSendTrack} className="space-y-6">
            <div className="text-left w-full max-w-md mx-auto">
              <label
                htmlFor="phone"
                className="block text-gray-800 font-semibold mb-1 text-base"
              >
                Phone Number <span className="text-gray-500 text-sm">(Optional)</span>
              </label>
              <div className="flex gap-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 p-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    <span className="text-lg">{selectedCountry.flag}</span>
                    <span className="text-sm font-medium">{selectedCountry.code}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {showDropdown && (
                    <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-hidden">
                      <div className="p-2 border-b">
                        <input
                          type="text"
                          placeholder="Search countries..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full p-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-emerald-400"
                        />
                      </div>
                      <div className="max-h-48 overflow-y-auto">
                        {filteredCountries.map((country, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setSelectedCountry(country);
                              setShowDropdown(false);
                              setSearchTerm("");
                            }}
                            className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 text-left"
                          >
                            <span className="text-lg">{country.flag}</span>
                            <span className="flex-1 text-sm">{country.name}</span>
                            <span className="text-sm font-medium text-gray-600">{country.code}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                  maxLength={15}
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 text-base"
                  placeholder="Enter phone number"
                />
              </div>
              <p className="text-gray-500 text-center text-xs mt-2">
                No spam, no calls. Just your free hypnosis track, tips, and offers.
              </p>
              <p className="text-gray-500 text-center text-xs mt-2">
                – with the option to opt out anytime
              </p>
            </div>
            <button
              type="submit"
              disabled={!phone.trim()}
              className={`w-full py-3 rounded-full text-base font-semibold shadow transition duration-150 ${
                phone.trim()
                  ? "bg-flourishmint text-white hover:scale-105"
                  : "bg-emerald-100 text-white cursor-not-allowed"
              }`}
            >
              Send My Free Hypnosis Track
            </button>
            <button
              type="button"
              onClick={handleSkip}
              className="w-full py-3 rounded-full text-base font-semibold shadow transition duration-150 bg-flourishmint text-emerald-800 hover:bg-emerald-300"
            >
              Skip & Proceed to Plan
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default QuizPhoneNumber;

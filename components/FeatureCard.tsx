
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  accentColor?: string;
}

export default function FeatureCard({ icon, title, description, accentColor = "#0074C8" }: FeatureCardProps) {
  return (
    <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div 
          className="w-20 h-20 flex items-center justify-center rounded-2xl mb-6 mx-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg"
          style={{ 
            backgroundColor: `${accentColor}15`,
            boxShadow: `0 10px 30px ${accentColor}20`
          }}
        >
          <i 
            className={`${icon} text-3xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}
            style={{ color: accentColor }}
          ></i>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-[#0074C8] transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-600 text-center leading-relaxed">
          {description}
        </p>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent group-hover:from-[#0074C8] group-hover:via-[#0097F2] group-hover:to-[#0074C8] transition-all duration-500"></div>
    </div>
  );
}

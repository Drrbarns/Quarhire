
interface TestimonialCardProps {
  name: string;
  role: string;
  image?: string;
  rating: number;
  text: string;
}

export default function TestimonialCard({ name, role, image, rating, text }: TestimonialCardProps) {
  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate a color based on name for consistent avatar colors
  const getAvatarColor = (name: string) => {
    const colors = [
      'from-[#0074C8] to-[#0097F2]',
      'from-[#0097F2] to-[#0074C8]',
      'from-[#0074C8] to-[#005da0]',
      'from-[#0097F2] to-[#0074C8]',
    ];
    const index = name.length % colors.length;
    return colors[index];
  };
  return (
    <div className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#0074C8]/30 overflow-hidden transform hover:-translate-y-1">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0074C8]/5 to-[#0097F2]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
      
      <div className="absolute top-6 right-6 text-7xl text-[#0074C8]/5 font-serif leading-none group-hover:text-[#0074C8]/10 transition-colors duration-500">
        "
      </div>
      
      <div className="relative z-10">
        <div className="flex gap-1 mb-6">
          {[...Array(rating)].map((_, i) => (
            <i 
              key={i} 
              className="ri-star-fill text-[#0097F2] text-xl w-5 h-5 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{ transitionDelay: `${i * 50}ms` }}
            ></i>
          ))}
        </div>
        
        <p className="text-gray-700 mb-6 leading-relaxed relative z-10 italic text-lg">
          "{text}"
        </p>
        
        <div className="flex items-center gap-4 pt-6 border-t border-gray-100 group-hover:border-[#0074C8]/20 transition-colors duration-500">
          <div className={`relative w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 ring-2 ring-gray-100 group-hover:ring-[#0074C8]/30 bg-gradient-to-br ${getAvatarColor(name)}`}>
            {image ? (
              <img 
                src={image} 
                alt={name}
                className="w-full h-full object-cover object-top rounded-full"
              />
            ) : (
              <span className="text-white font-bold text-lg">{getInitials(name)}</span>
            )}
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-lg group-hover:text-[#0074C8] transition-colors duration-300">{name}</h4>
            <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
              <i className="ri-briefcase-line text-xs"></i>
              {role}
            </p>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent group-hover:from-[#0074C8] group-hover:via-[#0097F2] group-hover:to-[#0074C8] transition-all duration-500"></div>
    </div>
  );
}

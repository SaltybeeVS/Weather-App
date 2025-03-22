function Card({ children, className }) {
    return (
      <div 
        className={`rounded-xl p-4 m-4 border backdrop-blur-[10px] backdrop-saturate-150
          bg-[rgba(30,30,30,0.3)] border-white/20 shadow-[0_6px_16px_rgba(0,0,0,0.2)]
          shadow-[inset_0_0_10px_rgba(255,255,255,0.15)] bg-gradient-to-br
          from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)]
          ${className || ""}`}
      >
        {children}
      </div>
    );
  }
  
  export default Card;
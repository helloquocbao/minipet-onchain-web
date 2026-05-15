import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          </div>
          <h1 className="relative text-9xl font-bold text-white tracking-tighter">
            404
          </h1>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 text-blue-400">
            <AlertCircle size={24} />
            <h2 className="text-2xl font-semibold">Page Not Found</h2>
          </div>
          <p className="text-slate-400">
            Oops! The pet you're looking for has wandered off into the digital wilderness.
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:ring-offset-[#0f172a]"
        >
          <Home className="w-5 h-5 mr-2 transition-transform group-hover:-translate-y-1" />
          Return Home
        </button>

        <div className="pt-8">
          <div className="grid grid-cols-3 gap-4 opacity-20">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

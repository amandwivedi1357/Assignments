import React, { useState, useRef, useContext, useEffect } from 'react';
import { Edit, CheckCircle, Copy, Briefcase, ExternalLink, User as UserIcon, Mail, Phone, Info, LogOut } from 'lucide-react';
import { AuthContext } from '../contexts/AuthContext'; 
import { ThemeContext } from '../contexts/ThemeContext'; 

const UserProfileCard = () => {
  const { user, updateUserStatus, logout } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  
  const [status, setStatus] = useState("");
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [showStatusToast, setShowStatusToast] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const statusInputRef = useRef(null);
  const emailRef = useRef(null); 

  useEffect(() => {
    if (user && user.statusMessage) {
      setStatus(user.statusMessage);
    } else if (user && !user.statusMessage) {
      setStatus("Ready to code!"); 
    }
  }, [user]);

  useEffect(() => {
    if (isEditingStatus && statusInputRef.current) {
      statusInputRef.current.focus();
    }
  }, [isEditingStatus]);

  const handleStatusSubmit = (e) => {
    e.preventDefault();
    if (updateUserStatus(status)) {
      setIsEditingStatus(false);
      setShowStatusToast(true);
      setTimeout(() => setShowStatusToast(false), 3000); 
    }
  };

  const handleEditStatus = () => {
    setIsEditingStatus(true);
  };

  const handleCopyEmail = () => {
    if (emailRef.current && user && user.email) {
      navigator.clipboard.writeText(user.email).then(() => {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      }).catch(err => {
        console.error('Failed to copy email: ', err);
        alert("Failed to copy email. Ensure you're on HTTPS or localhost.");
      });
    }
  };
  
  if (!user) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center">
        <p className="text-gray-700 dark:text-gray-300">Loading user profile...</p>
      </div>
    );
  }

  const renderDetail = (IconComponent, label, value, isLink = false, hrefPrefix = '') => {
    if (!value) return null;
    return (
      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
        <IconComponent className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
        <span className="font-medium">{label}:&nbsp;</span>
        {isLink ? (
          <a 
            href={`${hrefPrefix}${value}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline dark:text-blue-400"
          >
            {value}
          </a>
        ) : (
          <span>{value}</span>
        )}
      </div>
    );
  };

  return (
    <div className={`p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl transition-all duration-300 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
      {showStatusToast && (
        <div className="fixed top-5 right-5 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg z-50 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          Status Updated!
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <UserIcon className="w-20 h-20 sm:w-24 sm:h-24 text-blue-500 dark:text-blue-400 bg-gray-100 dark:bg-gray-700 p-3 rounded-full mr-0 sm:mr-6 mb-4 sm:mb-0" />
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{user.name || 'Developer Name'}</h2>
          <p className="text-md text-blue-600 dark:text-blue-400 font-medium">@{user.username || 'username'}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Status Message</h3>
        {isEditingStatus ? (
          <form onSubmit={handleStatusSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              ref={statusInputRef}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
              placeholder="What are you working on?"
            />
            <button 
              type="submit" 
              className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
              aria-label="Save Status"
            >
              <CheckCircle className="w-5 h-5" />
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg min-h-[40px]">
            <p className="italic text-gray-600 dark:text-gray-300">{status || "Set your status..."}</p>
            <button 
              onClick={handleEditStatus} 
              className="p-1.5 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Edit Status"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
        <div>
          <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">Contact Info</h4>
          {renderDetail(Mail, "Email", user.email)}
          {user.email && 
            <button 
              onClick={handleCopyEmail}
              className="ml-6 mb-2 text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors flex items-center"
            >
              <Copy className="w-3 h-3 mr-1" /> {copiedEmail ? 'Copied!' : 'Copy Email'}
            </button>
          }
          <textarea ref={emailRef} defaultValue={user.email} readOnly style={{position: 'absolute', left: '-9999px', opacity: 0}} aria-hidden="true" tabIndex={-1}/>
          {renderDetail(Phone, "Phone", user.phone)}
          {renderDetail(ExternalLink, "Website", user.website, true, 'http://')}
        </div>
        <div>
          <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">Company</h4>
          {user.company && (
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
              <Briefcase className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" />
              <span className="font-medium">Name:&nbsp;</span>
              <span>{user.company.name}</span>
              <span className="ml-2 px-2 py-0.5 text-xs font-semibold text-purple-700 bg-purple-100 dark:text-purple-200 dark:bg-purple-700 rounded-full">
                {user.company.bs ? user.company.bs.split(' ')[0] : 'Innovator'} 
              </span>
            </div>
          )}
          {user.company && renderDetail(Info, "Catchphrase", user.company.catchPhrase)}
        </div>
      </div>
      
      <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
        <button 
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out flex items-center"
        >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfileCard;
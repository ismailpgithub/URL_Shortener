import axios from 'axios';
import { useState } from 'react';
import { createShortUrl } from '../api/shortUrl.api';
import { useSelector } from 'react-redux';
import { queryClient } from '../main';
const Url_form = () => {

    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState(null);
    const [customSlug, setCustomSlug] = useState('');
    const {isAuthenticated} = useSelector((state) => state.auth);

    const handleSubmit = async () => {
        try {
          if(url=='') throw Error("URL is required");
          const data = await createShortUrl(url, customSlug);
          setShortUrl(data);
          queryClient.invalidateQueries({queryKey: ['userUrls']})
          setError(null)
        } catch (error) {
          setError(error.message)
        }
    }

    const hadleCopy = async ()=>{
        await navigator.clipboard.writeText(shortUrl);
        setCopied(true);
        
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }
    
  return (
   <>
   <div className="flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 w-full">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                URL Shortener
                </h2>
                <div className="space-y-4">
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enter URL to shorten
                        </label>
                        <input
                        type="url"
                        placeholder="https://example.com"
                        value={url}
                        onInput={(e)=>{setUrl(e.target.value)}}
                        onFocus={() => {if (!url) setUrl("https://")}}
                        onBlur={() => {if (url === "https://") setUrl("")}}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        />
                    </div>
                    
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >Shorten URL
                    </button>

                {error && (
                    <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                    </div>
                )}

                {isAuthenticated && (
                <div className="mt-4">
                    <label htmlFor="customSlug" className="block text-sm font-medium text-gray-700 mb-1">
                    Custom URL (optional)
                    </label>
                    <input
                    type="text"
                    id="customSlug"
                    value={customSlug}
                    onChange={(event) => setCustomSlug(event.target.value)}
                    placeholder="Enter custom slug"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                )}

                {shortUrl && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your shortened URL:
                    </label>
                    <div className="flex gap-2">
                        <input
                        type="text"
                        value={shortUrl}
                        readOnly
                        className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md"
                        />
                        <button
                        onClick={hadleCopy}
                        className={`px-4 py-2 rounded-r-md transition-colors duration-20 
                            ${copied ? 'bg-green-500 text-white hover:bg-green-600' 
                            : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                        {   copied ? "Copied" : "Copy"  }
                        </button>
                    </div>
                    </div>
                )}
                </div>  
        </div> 
     </div>
    </>
  )
}

export default Url_form

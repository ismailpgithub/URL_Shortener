import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllUserUrlsinfo } from '../api/user.api';

const UserUrl = () => {
  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrlsinfo,
    refetchInterval: 30000,
    staleTime: 0,
  });

  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center my-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-4">
        Error loading your URLs: {error.message}
      </div>
    );
  }

  if (!urls?.urls || urls.urls.length === 0) {
    return (
      <div className="text-center text-gray-500 my-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <p className="text-lg font-medium">No URLs found</p>
        <p className="mt-1">You haven't created any shortened URLs yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg mt-5 p-8 shadow-md overflow-hidden">
      <div className="overflow-x-auto h-56">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr className="h-16">
              <th className="px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original URL</th>
              <th className="px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short URL</th>
              <th className="px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
              <th className="px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {urls.urls.slice().reverse().map((url) => (
              <tr key={url._id} className="h-16 align-middle hover:bg-gray-50">
                <td className="px-6">
                  <div className="text-sm text-gray-900 max-w-xs h-full flex items-center leading-none">
                    {url.full_url}
                  </div>
                </td>
                <td className="px-6">
                  <div className="text-sm h-full flex items-center leading-none">
                    <a
                      href={`${import.meta.env.VITE_API_URL}/${url.short_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-900 hover:underline"
                    >
                      {`${import.meta.env.VITE_API_URL}/${url.short_url}`}
                    </a>
                  </div>
                </td>
                <td className="px-6">
                  <div className="text-sm text-gray-900 h-full flex items-center leading-none">
                    <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-2xl bg-blue-100 text-blue-800 whitespace-nowrap">
                      {url.clicks} {url.clicks === 1 ? 'click' : 'clicks'}
                    </span>
                  </div>
                </td>
                <td className="px-6">
                  <div className="h-full flex items-center">
                    <button
                      onClick={() => handleCopy(`${import.meta.env.VITE_API_URL}/${url.short_url}`, url._id)}
                      className={`w-28 h-8 box-border flex items-center justify-center px-2 border border-solid border-transparent text-xs font-medium rounded-2xl whitespace-nowrap shadow-sm transition-colors duration-200 leading-none focus:outline-none focus-visible:outline-none ${
                        copiedId === url._id
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      <span className="flex items-center justify-center w-full">
                        <svg
                          className="w-4 h-4 mr-1 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={
                              copiedId === url._id
                                ? 'M5 13l4 4L19 7'
                                : 'M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3'
                            }
                          />
                        </svg>
                        <span>
                          {copiedId === url._id ? 'Copied!' : 'Copy URL'}
                        </span>
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserUrl;

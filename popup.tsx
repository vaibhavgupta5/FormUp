import { FileText, RefreshCw, Zap } from "lucide-react"
import { useEffect, useState } from "react"

import "./style.css"

function Popup() {
  const [scrapedData, setScrapedData] = useState("Loading...")
  const [isLoading, setIsLoading] = useState(false)

  const rescrap = () => {
    console.log("geree")
    setIsLoading(true)
    setScrapedData("Loading...")

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id!,
        { type: "SCRAPE_DATA" },
        (response) => {
          setIsLoading(false)
          if (chrome.runtime.lastError) {
            setScrapedData("Error: " + chrome.runtime.lastError.message)
          } else {
            setScrapedData(response?.data || "No data received")
          }
        }
      )
    })
  }

  return (
    <div className="w-80 bg-gradient-to-br from-slate-50 to-white min-h-96 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full -translate-y-16 translate-x-16 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-100 to-yellow-100 rounded-full translate-y-12 -translate-x-12 opacity-40"></div>

      {/* Header */}
      <div className="relative z-10 bg-gradient-to-r from-yellow-600 to-orange-600 text-white p-6 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">FormUp</h1>
            <p className="text-yellow-100 text-sm font-medium">
              Smart Form Filler
            </p>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="relative z-10 -mt-4 mx-4 bg-white rounded-xl shadow-lg border border-slate-200/50 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-slate-600" />
          <h2 className="text-lg font-semibold text-slate-800">
            Auto Fill Forms
          </h2>
        </div>

        {/* Data display area */}
        <div className="bg-slate-50 rounded-lg p-4 mb-6 min-h-24 border border-slate-200">
          {isLoading ? (
            <div className="flex items-center justify-center h-20">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-5 h-5 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-medium">Extracting data...</span>
              </div>
            </div>
          ) : (
            <div className="text-slate-700 text-sm leading-relaxed break-words">
              {scrapedData === "Loading..." ? (
                <div className="text-slate-500 italic">
                  Ready to auto fill form on the current page
                </div>
              ) : (
                <div className="font-mono bg-white p-3 rounded border">
                  {scrapedData}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action button */}
        <button
          onClick={() => {
            console.log("btn clicked")
            rescrap()
          }}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2">
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? "Scraping..." : "Fill Form on Page"}
        </button>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center p-4">
        <div className="text-xs text-slate-500 flex items-center justify-center gap-1">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span>Ready to work</span>
        </div>
      </div>
    </div>
  )
}

export default Popup

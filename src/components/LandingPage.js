import Hoff from "./Hoff";
import Quote from "./Quote"
import Poll from './Poll'
import WeeklyBreakdown from "./WeeklyBreakdown";
import Phaucette from "./Phaucette";
import Cocawewa from "./Cocawewa";

function LandingPage(){
    return(

        <div className="p-4">
          
          <Quote></Quote>

          <div className="m-4"></div>
          <span className="p-1 rounded bg-green-200 w-fit font-bold">LTS Rankings</span>
          <div className="relative w-full mt-4 mb-4 overflow-hidden">
            <div className="flex overflow-x-auto no-scrollbar gap-4 py-2 pr-8">
                <Hoff className="flex-none min-w-22 overflow-visible bg-white py-4 rounded-md shadow-lg"></Hoff>
                <Phaucette className="flex-none min-w-22 bg-white p-4 rounded-md shadow-lg"></Phaucette>
                <Cocawewa className="flex-none min-w-22 bg-white p-4 rounded-md shadow-lg"></Cocawewa>
                {/* more items */}
            </div>

            <div className="absolute top-0 bottom-0 left-0 pointer-events-none">
                <div className="h-full w-6 bg-gradient-to-r from-white to-transparent"></div>
            </div>

            <div className="absolute top-0 bottom-0 right-0 pointer-events-none">
                <div className="h-full w-12 bg-gradient-to-l from-white to-transparent"></div>
            </div>
        </div>


          <style jsx>
          {`
          .no-scrollbar::-webkit-scrollbar {
          display: none;
          }
          .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
          }
          `}
          </style>



          <WeeklyBreakdown></WeeklyBreakdown>

          
          
          <Poll></Poll>

        </div>
    )
}

export default LandingPage;

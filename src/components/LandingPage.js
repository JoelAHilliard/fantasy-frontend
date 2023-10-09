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
          <div className="flex flex-row w-full gap-4 mt-4 mb-4 overflow-x-scroll">
            <Hoff className="min-w-12"></Hoff>
            <Phaucette className="min-w-12"></Phaucette>
            <Cocawewa className="min-w-12"></Cocawewa>
          </div>
          <WeeklyBreakdown></WeeklyBreakdown>

          
          
          <Poll></Poll>

        </div>
    )
}

export default LandingPage;

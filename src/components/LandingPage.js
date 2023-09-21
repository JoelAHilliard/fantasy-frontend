import Hoff from "./Hoff";
import Quote from "./Quote"
import Poll from './Poll'
import WeeklyBreakdown from "./WeeklyBreakdown";
import Phaucette from "./Phaucette";

function LandingPage(){
    return(

        <div className="p-4">
          
          <Quote></Quote>

          <div className="m-4"></div>
          <span className="p-1 rounded bg-green-200 w-fit font-bold">LTS Rankings</span>
          <div className="flex flex-row w-full gap-4 mt-4 mb-4">
            <Hoff></Hoff>
            <Phaucette></Phaucette>
          </div>
          <WeeklyBreakdown></WeeklyBreakdown>

          
          
          <Poll></Poll>

        </div>
    )
}

export default LandingPage;
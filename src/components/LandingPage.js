import Hoff from "./Hoff";
import Quote from "./Quote"
import Poll from './Poll'
import WeeklyBreakdown from "./WeeklyBreakdown";
import Phaucette from "./Phaucette";

function LandingPage(){
    return(

        <div className="p-4">

          <Quote></Quote>
          <Hoff></Hoff>
          <Phaucette></Phaucette>
          <WeeklyBreakdown></WeeklyBreakdown>
          <Poll></Poll>

        </div>
    )
}

export default LandingPage;
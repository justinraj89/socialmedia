import { ScaleLoader } from "react-spinners";

function loading() {
  return (
    <div className="h-screen flex justify-center">
        <div className="mt-24">
        <ScaleLoader color="black" height={40} width={8} className='mt-28'/>
        <div className="text-black-300 font-mono">loading...</div>
        </div>
    </div>

  )
  
}

export default loading;
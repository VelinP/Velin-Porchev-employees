import { useState } from 'react'
import Papa from 'papaparse'

export const Main = () =>{
    const [data , setData] = useState([]);
    const [longestworkers, setlongestworkers] = useState([])
    const [iscalcclicked,setiscalcclicked] = useState(false)
    
    //using papaprse to parse the info from clv file to json

    const uploadfunc = (e) =>{
        const file  = e.target.files[0];
        Papa.parse(file,{header:true,complete: (results) =>{setData(results.data)}});
        setiscalcclicked(false)
    };

    // finds the two workers who have worked the longest period of time,checks for null and appends them to an array which is sorted by
    // ascending order and takes the last two workers
    

    const calcfunc = () =>{
        let worklongest = [];
        setiscalcclicked(true)
        data.forEach((worker)=> {

            if(worker.EmpID === ''){
                return
            }

            let dateone = new Date(worker.DateFrom);
            let datetwo = ''; 

            debugger;
            if(worker.DateTo === 'NULL'){
                datetwo = new Date();
            }else{
                datetwo = new Date(worker.DateTo)
            }


            const difference =  datetwo.getTime()- dateone.getTime();
            const daysraw = difference / 86400000
            const days = Math.floor(daysraw)
            const workerid = worker.EmpID
            const projectid = worker.ProjectID
            const info = {workerid, projectid, days } 
            worklongest.push(info)
    
    })

    const sortedworkers = worklongest.sort((a,b)=> b.days-a.days).slice(0,2)
    setlongestworkers(sortedworkers)

    }

    return(
        // the input field accepts a file and renders all of its information on the screen
        // the button takes the information on screen and invokes the above stated function
        // works on a toggle basis where the condition rendering is based on a bool stored in state
        <>
        <div className='buttonsdiv'>
            <button onClick={calcfunc}>Calculate pair</button>
            <input type='file' accept='.csv' onChange={uploadfunc} />
        </div>
        
        <div className="maindiv">
            
            {iscalcclicked 
            
            ?(
            <table>
                <thead>
                    <tr>
                        <th>Employee ID #1</th>
                        <th>Employee ID #2</th>
                        <th>Project ID</th>
                        <th>Days worked</th>
                    </tr>
                </thead>

                <tbody>
                    
                   
                {longestworkers.map((row,index)=>(
                    <tr key={index}>
                        <td>{row.workerid}</td>
                        <td>{row.workerid}</td>
                        <td>{row.projectid}</td>
                        <td>{row.days}</td>
                    </tr>
                ))}
                </tbody>
            </table>


            )
            
            : 
            
            <table>
                <thead>
                    <tr>
                         <th>EmpID</th>
                            <th>ProjectID</th>
                            <th>DateFrom</th>
                            <th>DateTo</th>
                        </tr>
                </thead>

                    <tbody>
                    
                    {data.map((row,index)=>(
                        <tr key={index}>
                            <td>{row.EmpID}</td>
                            <td>{row.ProjectID}</td>
                            <th>{row.DateFrom}</th>
                            <th>{row.DateTo}</th>
                        </tr>
                    ))}
                    </tbody>
                </table>}

        </div>
        </>
    )
}


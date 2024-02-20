import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes } from "../../Store/Slices/noteSlice/notesSlice";
import { Link } from "react-router-dom";
import Loading from "../loading/loading";

const AllNotes = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPage] = useState([]);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user ? user.userData.userName : null;
  const fetchedNotes = useSelector((state) => state.userNote?.note);
  const isLoading = useSelector((state) => state.userNote.isLoading);
 
console.log(fetchedNotes);
  useEffect(() => {
    dispatch(fetchNotes(currentPage));
  }, [currentPage]);

  useEffect(() => {
    if (fetchedNotes) {
      const pages = fetchedNotes.totalPage;
      const totalNotes = Array.from({ length: pages }, (_, index) => index + 1);
      setTotalPage(totalNotes);
      setData(fetchedNotes.data);
    }
  }, [fetchedNotes]);

 
console.log(data);

  const handleSearch = async () => {
    try {
      const data = JSON.parse(localStorage.getItem("user"));

      const token = data.token;

      if (!token) {
        throw new Error("unAuthorized User");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
       
      const response = await fetch(
        `https://mern-notes-app-wbp8.onrender.com/note/searchNotes?query=${query}`,
        config
      );
      if (!response.ok) {
        window.location.reload();
        throw new Error("Failed to fetch data");
      }
      const searchData = await response.json();

      setResult(searchData);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <div className="w-[100%] flex flex-col items-center h-[92vh] bg-yellow-500">
        <div className="flex justify-between items-center w-[92%]">
          <h1 className="font-[700] text-[25px] text-cyan-950 xs:text-[14px] xm:text-[17px] sm:text-[20px]">
            Hey,{userName}
          </h1>

          <span className="flex justify-center items-center gap-x-1">
            <input
              type="text"
              placeholder="search notes"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-[20rem] h-[2.3rem] xm:w-[80%] xs:h-[1.8rem] xs:w-[50%] sm:w-[17rem] "
            />
            <button
              className="border h-[2.3rem] w-[8rem] hover:bg-white xs:w-[4rem] xs:h-[1.5rem] xs:text-[14px] xm:w-[5rem] xm:text-[16px] xm:h-[1.8rem] sm:w-[7rem]"
              onClick={handleSearch}
            >
              Submit
            </button>
          </span>
          <Link to={"/note/addNotes"}>
            <button className="border text-[13px] rounded-[1rem] bg-cyan-950 text-white font-[500] w-[7rem] h-[1.8rem] xs:w-[4rem] xs:text-[9px] xs:font-[400] xs:h-[1.5rem] xm:w-[5rem] xm:text-[10px] xm:font-[400] xm:h-[1.8rem] sm:w-[6rem] sm:text-[13px] sm:font-[400]">
              +New Note
            </button>
          </Link>
        </div>

        {result ? (
          <div className="w-[96%] h-[75vh] mt-[1rem] pt-5 grid grid-cols-3">
           
              {result.length > 0 ? (
                        result.map((item, index) => (
              <div
                key={index}
                className="bg-white overflow-hidden flex justify-start items-start flex-col gap-x-[0.5rem] w-[99%] gap-y-[0.5rem] border bottom-solid box-border p-3 cursor-pointer xs:h-[90%]"
              >
                <Link
                  to={`/editNotes/${item._id}`}
                  className="h-[100%] w-[100%] overflow-hidden flex justify-start item-start flex-col gap-x-[0.5rem] gap-y-[0.5rem] xs:gap-y-[2.5rem] xs:leading-[1.1rem] xm:leading-[1.2rem] text-center leading-[1.2rem]"
                >
                  <p className="mb-2 text-cyan-950 font-[800] text-[1.2rem] w-[100%] h-[10%] capitalize xs:text-[15px] xs:font-[700] xs:mb-[1.5rem]  xm:mb-[1rem] xm:text-[18px] xm:font-[700]">
                    {item.title}
                  </p>
                  <p className="w-[100%] h-[90%] xs:text-[12px] xs:font-[500] xm:mt-[3rem] xm:text-[15px] xm:font-[500] text-[18px] font-[500]">
                    {item.body}
                  </p>
                </Link>
              </div>
            ))
            ): (<div
            className="w-[95vw] h-[100%] flex justify-center items-center text-[2.5rem]
        font-[700] text-sky-950"
          >
            No Note
          </div>)}
          </div>
        ) : (
            
          <div className="w-[96%] h-[72vh] mt-[1rem] pt-5 grid grid-cols-3">
            
            { !isLoading ? 
                (  Array.isArray(data) && data ? (
              data.map((item, index) => (
                <div
                  key={index}
                  className="bg-white overflow-hidden flex justify-start items-start flex-col gap-x-[0.5rem] w-[99%] gap-y-[0.5rem] border bottom-solid box-border p-3 cursor-pointer xs:h-[90%]"
                >
                  <Link
                    to={`/editNotes/${item._id}`}
                    className="h-[100%] w-[100%] overflow-hidden flex justify-start item-start flex-col gap-x-[0.5rem] gap-y-[0.5rem] xs:gap-y-[2.5rem] xs:leading-[1.1rem] xm:leading-[1.2rem] text-center leading-[1.2rem]"
                  >
                    <p className="mb-[4rem] text-cyan-950 font-[800] text-[1.2rem] w-[100%] h-[10%] capitalize xs:text-[15px] xs:font-[700] xs:mb-[1.5rem]  xm:mb-[1rem] xm:text-[18px] xm:font-[700]">
                      {item.title}
                    </p>
                    <p className="w-[100%] h-[90%] xs:text-[12px] xs:font-[500] xm:mt-[3rem] xm:text-[15px] xm:font-[500] text-[18px] font-[500]">
                      {item.body}
                    </p>
                  </Link>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center text-[5rem] font-[700] w-[95vw] h-[100%] text-gray-700">
               No data
              </div>
            )):(  
              <div className="cell grid col-span-3 items-center justify-items-center row-span-3 text-gray-700">
              <Loading />
              </div>
)}
          </div>
          
        )}

        <ul className="mt-[0.5rem] bg-slate-700 w-[90%] flex justify-center items-center gap-x-[2rem]">
          {totalPages.map((item, index) => (
            <li
              className="border cursor-pointer bg-slate-50 list-none w-[1.8rem] h-[2rem] flex justify-center items-center"
              key={index}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AllNotes;

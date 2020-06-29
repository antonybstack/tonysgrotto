import React from "react";
import axios from "axios";
import moment from "moment-timezone";

const Admin = () => {
  var profList = [];
  var numOfProf = 0;

  const clearChats = async () => {
    var temp;
    const updateBeforeClear = async () => {
      await axios.get("/api/chats").then((res) => {
        temp = res.data;
      });
    };
    await updateBeforeClear();

    temp.forEach((t) => {
      axios.delete("api/chats/delete/" + t._id);
    });
  };

  const clearProfessors = async () => {
    var temp;
    const updateBeforeClear = async () => {
      await axios.get("/api/professors").then((res) => {
        temp = res.data;
      });
    };
    await updateBeforeClear();

    temp.forEach((t) => {
      setTimeout(function () {
        axios.delete("api/professors/delete/" + t._id);
        console.log("professor deleted: ", t._id);
      }, 100);
    });
  };

  const numOfProfessors = async () => {
    const getProfessorsNum = async () => {
      await axios.post("https://www.ratemyprofessors.com/filter/professor/?&page=1&filter=teacherlastname_sort_s+asc&query=*%3A*&queryoption=TEACHER&queryBy=schoolId&sid=1253").then((res) => {
        numOfProf = res.data.searchResultsTotal;
        console.log(numOfProf);
      });
    };
    await getProfessorsNum();

    async function professorList() {
      let numOfPages = numOfProf / 20;
      let i = 1;
      while (i <= numOfPages) {
        await axios
          .post("https://www.ratemyprofessors.com/filter/professor/?&page=" + i + "&filter=teacherlastname_sort_s+asc&query=*%3A*&queryoption=TEACHER&queryBy=schoolId&sid=1253")
          .then((res) => {
            let arr = res.data.professors;
            console.log(arr);
            arr.forEach((element) => profList.push(element));
          });
        i += 1;
      }
    }
    async function professorAdd(tempProfessor) {
      axios
        .post("api/professors/add", tempProfessor)
        .then((res) => {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    setTimeout(function () {
      professorList();
    }, 1000);

    setTimeout(function () {
      console.log(profList);
      var index = 0;
      var interval = setInterval(function () {
        let tFname = profList[index].tFname;
        let tMiddlename = profList[index].tMiddlename;
        let tLname = profList[index].tLname;
        let tid = profList[index].tid;
        let tNumRatings = profList[index].tNumRatings;
        let overall_rating = profList[index].overall_rating;

        const tempProfessor = {
          tFname: tFname,
          tMiddlename: tMiddlename,
          tLname: tLname,
          tid: tid,
          tNumRatings: Number(tNumRatings),
          overall_rating: Number(overall_rating),
        };
        professorAdd(tempProfessor);
        index++;
        if (index == profList.length) {
          clearInterval(interval);
        }
      }, 50);
    }, 15000);
  };
  //creates ticket object
  //  const newTicket = {
  //   tFname: ,
  //   tMiddlename: ,
  //   tLname: ,
  //   tid: ,
  //   tNumRatings: ,
  //   overall_rating: ,
  // };
  // HTTP POST method sends data to the server
  //   axios
  //     .post("api/tickets/add", newTicket)
  //     .then((res) => {
  //       setMessage(null);
  //       setTickets((currentTickets) => [...currentTickets, { _id: res.data.ticket._id, ticket_name: name, ticket_status: "backlog", created_by: user._id }]); //push ticket object to state array
  //     })
  //     .catch(function (error) {
  //       setMessage(error.response.data.message);
  //       setShow(!show);
  //     });

  // };
  //   axios
  //     .post("api/tickets/add", newTicket)
  //     .then((res) => {
  //       setMessage(null);
  //       setTickets((currentTickets) => [...currentTickets, { _id: res.data.ticket._id, ticket_name: name, ticket_status: "backlog", created_by: user._id }]); //push ticket object to state array
  //     })
  //     .catch(function (error) {
  //       setMessage(error.response.data.message);
  //       setShow(!show);
  //     });

  //   await updateBeforeClear();

  //   temp.forEach((t) => {
  //     axios.delete("api/chats/delete/" + t._id);
  //   });
  // };
  return (
    <>
      <h1>Admin Page</h1>
      <button className="clearChatsDrag" onClick={clearChats}>
        clear chats
      </button>
      <button className="clearChatsDrag" onClick={numOfProfessors}>
        update professor list
      </button>
      <button className="clearChatsDrag" onClick={clearProfessors}>
        clearProfessors
      </button>
    </>
  );
};

export default Admin;

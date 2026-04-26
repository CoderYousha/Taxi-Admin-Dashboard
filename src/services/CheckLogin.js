import { useNavigate } from "react-router-dom";

async function CheckLogin(host) {

     let result = await fetch(host + '/api/getProfile', {
          method: "POST",
          headers: {
               'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
     });

     if (result.status == 200) {
          result = await result.json();
          return result;
     } else {
          return false;
     }
}

export default CheckLogin;
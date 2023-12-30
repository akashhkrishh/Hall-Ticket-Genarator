import { toast } from "react-toastify";

const validateReg = (Regno) =>{
    var strReg = Regno.toString();
    if(strReg.length < 8){
        toast.error("Invalid Registration Number");
        return false;
    }   
    return true;
}


function reverseDate(inputDate) {
    // Split the date string into an array of components
    var dateComponents = inputDate.split('-'); // Assuming the date is in the format 'YYYY-MM-DD'
  
    // Reverse the order of the components
    var reversedComponents = dateComponents.reverse();
  
    // Join the reversed components back into a string
    var reversedDate = reversedComponents.join('-');
  
    return reversedDate;
  }
  

  


export {
    validateReg,
    reverseDate,
}
import { useParams } from 'react-router-dom';
import Navbar1 from "../../components/navigation/Navbar1.js";
import ApliForm from "../../components/home/ApliForm.js";

function AplicantForm({}) {
    const {id} = useParams();
  return (
  <>
    <Navbar1/>
    <br/>
    <br/>
    <br/>
    <body style={{paddingTop: "40px",paddingBottom: "40px"}}>
    <ApliForm id={id}/>
    </body>
  </>
  );
};

export default AplicantForm;

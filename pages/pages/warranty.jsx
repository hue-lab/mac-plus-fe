import React from "react";
import {getFieldsObject} from "~/utils/endpoints/fields";

Privacy.getInitialProps = async (context) => {
  const fields = await getFieldsObject(
    'warranty',
  );
  return { fields: fields };
}

export default function Privacy ({ fields }) {
  return (
    <div className="container" style={{paddingTop: "2rem", paddingBottom: "2rem"}} dangerouslySetInnerHTML={{__html: fields['warranty']}}></div>
  )
}

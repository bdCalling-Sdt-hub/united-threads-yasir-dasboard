"use client";

import { Button } from "antd";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


const PrivacyPolicyEditor = () => {
  const [value, setValue] = useState(
    "<h2>Education is the cornerstone of personal and societal development, opening doors to opportunities and empowering individuals to reach their full potential. It is not merely about acquiring knowledge; it is about fostering critical thinking, creativity, and lifelong learning. The pursuit of education equips us with the tools to navigate the complexities of the world, make informed decisions, and contribute meaningfully to our communities.</h2><p><br/></p><h2>In today’s rapidly evolving world, the importance of education cannot be overstated. Technological advancements, global interconnectivity, and the proliferation of information demand that we continuously adapt and expand our understanding. An educated individual is better prepared to tackle these challenges, innovate, and drive progress. Moreover, education promotes equality and social justice, providing marginalized groups with the means to uplift themselves and break cycles of poverty.</h2><p><br/></p><h2>Education also nurtures empathy and cultural awareness, fostering a more inclusive and understanding society. By learning about diverse perspectives and histories, we become more open-minded and respectful of differences, which is crucial in a world that is increasingly interconnected. This cultural competence not only enhances personal relationships but also strengthens international collaboration and peace.....</h2>"
  );

  const toolbarOptions = [
    ["image"],
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
  ];

  const moduleConest = {
    toolbar: toolbarOptions,
  };

  return (
    <>
      <ReactQuill
        modules={moduleConest}
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="Start writing ......"
      />
       <Button
        size="large"
        block
        style={{
          marginTop: "20px",
          backgroundColor: "transparent",
          color: "#000",
          border: "1px solid #232323",
          borderRadius: "20px"
        }}
      >
        Save Changes
      </Button>
    </>
  );
};

export default dynamic(() => Promise.resolve(PrivacyPolicyEditor), { ssr: false });
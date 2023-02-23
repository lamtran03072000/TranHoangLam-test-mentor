import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

type Props = {
  handleChangeDescription: (evt: any, editor: any) => void;
  description: string;
};

export default function TextEditter({
  handleChangeDescription,
  description,
}: Props) {
  return (
    <>
      <Editor
        apiKey="9we15r5o4ijggytw9z4nt35jl0nzt46hsmtt73jh8z3wlqh5"
        value={description}
        onEditorChange={handleChangeDescription}
        init={{
          height: 200,
          menubar: false,
          statusbar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body {font-family:Helvetica,Arial,sans-serif;  font-size:14px }",
        }}
      />
    </>
  );
}

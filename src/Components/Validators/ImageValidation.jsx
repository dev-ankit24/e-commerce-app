export default function imageValidation(e) {
  var { files } = e.target;
  if (files.length === 1) {
    let file = files[0];
    if (file.size > 1048576)
         return "File size 10kb to 1Mb";
    else if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/webp" ||
      file.type === "image/png"
    )
     return "";
    else
     return "File Format InVailid";
  }
  else {
    let error=[];
    for(let index in Array.from(files)){
      let file =files[index]

      if (file.size > 1048576)
        error.push( `pic ${parseInt(index)+1}size 10kb to 1Mb`);
    
   else if (
     file.type === "image/jpeg" ||
     file.type === "image/jpg" ||
     file.type === "image/webp" ||
     file.type === "image/png"
   );
   else
    error.push(`pic ${parseInt(index)+1} Format InVailid`);
    }
    return error.length ? error.length.join(" , ") :""
  }
}

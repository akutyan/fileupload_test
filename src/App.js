import { useCallback, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Center, useColorModeValue, Icon } from "@chakra-ui/react";
import { AiFillFileAdd } from "react-icons/ai";

export default function Dropzone() {
  console.log("-1-");
  const [updateFiles, setUpdateFiles] = useState([]);
  console.log(updateFiles);
  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log("-2-");
      console.log(updateFiles);
      const onFileAccepted = () => {
        // const updatedFiles = acceptedFiles;

        // 配列の結合処理
        const tmpUpdateFiles = [...updateFiles, ...acceptedFiles];
        // const uniqueUpdateFiles = [...new Set(tmpUpdateFiles)];
        // const uniqueUpdateFiles = [
        //   ...new Set([...updateFiles, ...updatedFiles])
        // ];

        // 重複ファイルの削除
        const uniqueUpdateFiles = tmpUpdateFiles.filter(
          (element, index, self) =>
            self.findIndex((e) => e.path === element.path) === index
        );
        // setUpdateFiles([...updateFiles, ...updatedFiles]);
        // setUpdateFiles([...tmpUpdateFiles]);
        setUpdateFiles([...uniqueUpdateFiles]);

        // console.log(updateFiles);
      };
      onFileAccepted();
      // console.log(acceptedFiles);
    },
    [updateFiles]
  );
  console.log(updateFiles);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".png",
    // maxFiles: 10,
    multiple: true
  });

  const dropText = isDragActive
    ? "Drop the files here ..."
    : "Drag 'n' drop .torrent file here, or click to select files";

  const activeBg = useColorModeValue("gray.100", "gray.600");
  const borderColor = useColorModeValue(
    isDragActive ? "teal.300" : "gray.300",
    isDragActive ? "teal.500" : "gray.500"
  );

  const files = useMemo(
    () =>
      updateFiles.map((file, index) => (
        <li key={file.path}>
          ({index}){file.path} - {file.size} bytes
          <button onClick={() => onClickDelete(index)}>削除</button>
        </li>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updateFiles]
  );

  const onClickDelete = (index) => {
    updateFiles.splice(index, 1);
    setUpdateFiles([...updateFiles]);
  };
  const onClickUpload = () => {
    alert("アップロードしました");
    setUpdateFiles([]);
  };
  const onClickReset = () => {
    setUpdateFiles([]);
  };

  return (
    <>
      <Center
        p={10}
        cursor="pointer"
        bg={isDragActive ? activeBg : "transparent"}
        _hover={{ bg: activeBg }}
        transition="background-color 0.2s ease"
        borderRadius={4}
        border="3px dashed"
        borderColor={borderColor}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Icon as={AiFillFileAdd} mr={2} />
        <p>{dropText}</p>
      </Center>
      <ul>{files}</ul>
      <button onClick={() => onClickUpload()}>アップロード</button>
      <button onClick={() => onClickReset()}>リセット</button>
    </>
  );
}

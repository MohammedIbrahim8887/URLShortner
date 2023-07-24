// Import required modules and components
import { FC, useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { useTheme } from "./hooks/useTheme";
import { Switch } from "./components/ui/switch";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { Loader2 } from "lucide-react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { sendLinks } from "./api/sendLink";
import { useToast } from "./components/ui/use-toast";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Clipboard } from "lucide-react";

// Define the type for the form values
interface MyFormValues {
  url: string;
}

// Define the main functional component App
export const App: FC<{}> = () => {
  // Get the current theme and the function to toggle the theme using the useTheme hook
  const { theme, toggleTheme } = useTheme();

  // Define the initial form values
  const initialValues: MyFormValues = {
    url: "",
  };

  // Create a mutation instance for handling the URL shortening
  const sendURL = useMutation({
    mutationFn: sendLinks,
  });

  // State to handle the copied URL and its status
  const [copy, isCopy] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");

  // Destructure the properties from the sendURL mutation
  const {
    isLoading: isSendingLoading,
    isError: isSendingError,
    error: sendError,
    data: receivedData,
    isSuccess: isReceivedDataSuccessfully,
  } = sendURL;

  // Get the toast function from the useToast hook
  const { toast } = useToast();

  // Function to handle form submission
  const handleSubmit = (values: MyFormValues) => {
    sendURL.mutate(values.url);
  };

  // Effect hook to handle API error and success messages
  useEffect(() => {
    if (isSendingError) {
      console.log(sendURL);
      toast({
        title: "Uh oh! Something went wrong. 😥",
        variant: "destructive",
        description: `${sendError}`,
      });
    }
    if (isReceivedDataSuccessfully) {
      console.log(receivedData);
      toast({
        title: "Your link is ready 😃",
      });
    }
  }, [isSendingError, isReceivedDataSuccessfully]);

  // Create formik instance for form management
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  // Effect hook to handle copied URL toast
  useEffect(() => {
    if (copy) {
      toast({
        title: "Successfully copied to clipboard",
        description: url,
      });
    }
    setTimeout(() => {
      isCopy(false);
    }, 200);
  }, [copy]);

  // Effect hook to update the shortened URL
  useEffect(() => {
    if (isReceivedDataSuccessfully && receivedData.length > 0) {
      setUrl(`gotiny.cc/${receivedData[0].code}`);
    }
  }, [isReceivedDataSuccessfully]);

  // Render the main App component
  return (
    <div
      className={`${
        theme === "light"
          ? "bg-[#F6F8E2] text-[#263238]"
          : "bg-[#263238] text-[#F6F8E2]"
      } w-screen h-screen flex flex-col p-6 gap-6`}
    >
      <div className="flex self-end space-x-2">
        {/* Switch component to toggle theme */}
        <Switch onClick={toggleTheme} />
        <Label htmlFor="theme-toggle" className="self-center">
          {theme}
        </Label>
      </div>
      <Card
        className={`border-solid border-2 rounded-lg w-fit max-md:px-8 px-16 py-8 m-auto flex flex-col gap-4 ${
          theme === "light"
            ? "border-[#2632382d] bg-[#2632381c] "
            : "bg-[#f6f8e21e] border-[#f6f8e21e] text-[#F6F8E2]"
        }`}
      >
        {/* <img src={pain} alt="pain" className="w-1/4" /> */}
        <Label className="text-2xl font-semibold m-auto ">URL Shortener</Label>

        {/* Form to enter the URL */}
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <Input
            onChange={formik.handleChange}
            value={formik.values.url}
            onBlur={formik.handleBlur}
            name="url"
            type="text"
            id="url"
            placeholder="Enter your link"
            className="bg-[#F6F8E2] text-[#263238] w-96 max-md:w-full"
          />
          {!isSendingLoading ? (
            <Button
              className="hover:bg-[#9ccd62] hover:text-[#263238] m-auto"
              type="submit"
            >
              Submit
            </Button>
          ) : (
            <Button disabled className="m-auto">
              {/* Loader component while sending the URL */}
              <Loader2 className="animate-spin" size={24} />
            </Button>
          )}
        </form>
        {isReceivedDataSuccessfully ? (
          <>
            <Label>Your Link is</Label>
            {/* Card to display the shortened URL and copy to clipboard functionality */}
            <Card className="bg-[#F6F8E2] text-[#263238] w-96 max-md:w-fit px-4 py-2 flex flex-row justify-between gap-2">
              <p className="self-center">{url}</p>
              <CopyToClipboard text={url} onCopy={() => isCopy(true)}>
                {/* Card component with clipboard icon for copying */}
                <Card className="bg-[#26323834] text-[#263238] w-fit max-md:w-fit px-2 py-2 cursor-pointer transition ease-in-out active:scale-75 ">
                  <Clipboard color="#263238" />
                </Card>
              </CopyToClipboard>
            </Card>
          </>
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
};

// Export the App component as the default export
export default App;

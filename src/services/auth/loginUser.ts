export const loginUser = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const res = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("resss login user", res);
  } catch (error: any) {
    console.log(error);
  }
};

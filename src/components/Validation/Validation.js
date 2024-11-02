const Validation = (values, type) => {
  let errors = {};

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  if (type === "login") {
    if (!values.email.trim()) {
      errors.email = "E-mail tələb olunur.";
    } else if (!/\S+@\S+\.\S+/.test(values.email.trim())) {
      errors.email = "Keçərli bir e-mail daxil edin.";
    }

    if (!values.password) {
      errors.password = "Şifrə tələb olunur.";
    }
  }

  if (type === "register") {
    if (!values.fullname.trim()) {
      errors.fullname = "Ad və soyad tələb olunur.";
    } else {
      const nameParts = values.fullname.trim().split(" ");
      if (nameParts.length < 2) {
        errors.fullname = "Ad və soyad daxil edin.";
      }
    }

    if (!values.phone.trim()) {
      errors.phone = "Telefon nömrəsi tələb olunur.";
    } else if (!/^\d{9}$/.test(values.phone.trim())) {
      errors.phone =
        "Telefon nömrəsi 10 rəqəmli olmalıdır (məsələn, 055XXXXXXX).";
    }

    if (!values.email.trim()) {
      errors.email = "E-mail tələb olunur.";
    } else if (!/\S+@\S+\.\S+/.test(values.email.trim())) {
      errors.email = "Keçərli bir e-mail daxil edin.";
    }

    if (!values.password) {
      errors.password = "Şifrə tələb olunur.";
    } else if (!strongPasswordRegex.test(values.password)) {
      errors.password =
        "Şifrəniz ən azı 8 simvoldan ibarət olmalı, bir böyük hərf, bir kiçik hərf, bir rəqəm və bir xüsusi simvol içerməlidir.";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Şifrənin təkrarını daxil edin.";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Şifrələr uyğun gəlmir.";
    }
  }

  if (type === "addProduct") {
    if (!values.productName.trim()) {
      errors.productName = "Məhsul adı tələb olunur.";
    } else if (values.productName.length < 3) {
      errors.productName = "Məhsul adı ən azı 3 simvoldan ibarət olmalıdır.";
    }

    if (!values.price) {
      errors.price = "Qiymət tələb olunur.";
    } else if (isNaN(values.price) || values.price <= 0) {
      errors.price = "Keçərli bir qiymət daxil edin.";
    }

    if (!values.category.trim()) {
      errors.category = "Kateqoriya tələb olunur.";
    }

    if (!values.description.trim()) {
      errors.description = "Təsvir tələb olunur.";
    } else if (values.description.length < 10) {
      errors.description = "Təsvir ən azı 10 simvoldan ibarət olmalıdır.";
    }
  }

  return errors;
};

export default Validation;

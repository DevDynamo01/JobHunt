import time
import pickle
from selenium import webdriver
from selenium.webdriver.common.by import By



def LoginLinkedin(username,password):
    driver=webdriver.Chrome()
    driver.get("https://www.linkedin.com/login")
    time.sleep(2)

    username_field=driver.find_element(By.ID,"username")
    password_field=driver.find_element(By.ID,"password")

    username_field.send_keys(username)
    password_field.send_keys(password)

    login_button=driver.find_element(By.XPATH,"//button[@type='submit']")

    login_button.click()

    time.sleep(10)
    pickle.dump(driver.get_cookies(),open("cookies.pkl","wb"))
    driver.quit()
    print("Log in successfull..")


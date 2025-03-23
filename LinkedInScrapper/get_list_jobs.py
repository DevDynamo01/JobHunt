import time
import pickle
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from login_linkedin import LoginLinkedin



def get_list_jobs(job_type):
    driver=webdriver.Chrome()
    LoginLinkedin(username="burning8phoenix@gmail.com",password="amartyapawar")
    job_type=job_type.replace(" ","%20")
    url=f"https://www.linkedin.com/jobs/search/?currentJobId=4189471241&keywords={job_type}&origin=BLENDED_SEARCH_RESULT_NAVIGATION_SEE_ALL&originToLandingJobPostings=4175550821%2C4191375418%2C4189471241"

    driver.get(url)

    for cookie in pickle.load(open("cookies.pkl","rb")):
        driver.add_cookie(cookie)

    driver.get(url)
    time.sleep(3)


    link_elements=WebDriverWait(driver,15).until(
        EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'a[class*="job-card-container__link"]'))
    )

    links=[element.get_attribute("href") for element in link_elements if element.get_attribute("href")]
    return links


if __name__=="__main__":
    job_type="web devlopment"
    print(get_list_jobs(job_type))
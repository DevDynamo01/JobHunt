import time
import pickle
from selenium import webdriver
from selenium.webdriver.common.by import By


def GetCompanyAndJobDetails(job_url):
    driver = webdriver.Chrome()
    driver.get(job_url)

    for cookie in pickle.load(open("cookies.pkl", "rb")):
        driver.add_cookie(cookie)

    driver.get(job_url)
    time.sleep(3)

    company_a_tag = driver.find_element(By.CSS_SELECTOR, "div.job-details-jobs-unified-top-card__company-name a")
    job_position = driver.find_element(By.CSS_SELECTOR, "div.job-details-jobs-unified-top-card__job-title h1").text
    company_logo_link = driver.find_element(By.CSS_SELECTOR, "div.ivm-view-attr__img-wrapper img").get_attribute("src")
    company_name = company_a_tag.text
    company_link = company_a_tag.get_attribute("href")

    info = {}

    info["job_position"] = job_position
    info["company_logo_link"] = company_logo_link
    info["company_name"] = company_name
    info["company_link"] = company_link

    return info

if __name__=="__main__":
    url="https://www.linkedin.com/jobs/view/4187709558/?eBP=BUDGET_EXHAUSTED_JOB&refId=Z0Y72ZTt8Q6IMUPHpDXl2w%3D%3D&trackingId=jubH0dnUpz91f2jFOF2crA%3D%3D&trk=flagship3_search_srp_jobs"
    GetCompanyAndJobDetails(job_url=url)
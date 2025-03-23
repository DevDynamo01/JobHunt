import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.ie.webdriver import WebDriver
from login_linkedin import LoginLinkedin

driver=webdriver.Chrome()
LoginLinkedin(driver=driver,username="amartyapawar007@gmail.com",password="b.S@X-mA*A8y6f8")

url="https://www.linkedin.com/jobs/view/4189471241/?eBP=NOT_ELIGIBLE_FOR_CHARGING&refId=wkMxvkoG82UMoMYq3BXxDA%3D%3D&trackingId=YLs13f2FSphmmzYo8a6Rsw%3D%3D&trk=flagship3_search_srp_jobs"

driver.get(url)
time.sleep(5)

see_more=driver.find_element(By.XPATH, "//button[@aria-label='Click to see more description']")

driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", see_more)
time.sleep(3)

see_more.click()

text=driver.find_element(By.CSS_SELECTOR,'div.mt4 > p').text
print(text)


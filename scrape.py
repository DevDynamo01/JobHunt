from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

# Initialize WebDriver (update path if necessary)
driver = webdriver.Chrome()
#
# # Open LinkedIn login page
# driver.get("https://www.linkedin.com/login")
#
# # Wait for elements to load
# time.sleep(2)
#
# # Locate username and password fields
# username_field = driver.find_element(By.ID, "username")
# password_field = driver.find_element(By.ID, "password")
#
# # Enter credentials
# username_field.send_keys("amartyapawar007@gmail.com")
# password_field.send_keys("b.S@X-mA*A8y6f8")
#
# # Click the login button
# login_button = driver.find_element(By.XPATH, "//button[@type='submit']")
# login_button.click()
#
# # Wait for successful login
# time.sleep(50)

# Example scraping: Visiting a profile or job listings
driver.get("https://www.linkedin.com/jobs/search/?currentJobId=4191319534&distance=25.0&geoId=102713980&keywords=web%20developer&origin=HISTORY")
# Extract job titles
link_elements = WebDriverWait(driver, 15).until(
    EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'a[class*="job-card-container__link"]'))
)
#
links = [element.get_attribute("href") for element in link_elements if element.get_attribute("href")]
#
for idx, link in enumerate(links, start=1):
    print(f"{idx}. {link}")
#
#
#
#
#
# time.sleep(10)
# # Close the browser
# driver.quit()
# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# import time  # For adding brief pauses during scrolling
#
# # Initialize the browser driver
# driver = webdriver.Chrome()

# Open the webpage
# from selenium import webdriver
# from selenium.webdriver.common.by import By
# import time

# Initialize WebDriver
# driver = webdriver.Chrome()  # Or your preferred browser driver
# driver.get("https://www.linkedin.com/jobs/search/?currentJobId=4189471241&keywords=software%20developer%20jobs&origin=BLENDED_SEARCH_RESULT_NAVIGATION_SEE_ALL&originToLandingJobPostings=4175550821%2C4191375418%2C4189471241")

# time.sleep(10)
#
# # Scroll and Collect Links
# # WebDriverWait(driver, 20).until(
# #     EC.presence_of_element_located((By.CSS_SELECTOR, 'div[data-results-list-top-scroll-sentinel]'))
# # )
# #
# # # Scrollable element
# # scrollable_div = driver.find_element(By.CSS_SELECTOR, 'div.vUCwJIzISzavdDUqUoVFLReVnvJYyjA')
#
# # Scroll and Collect Links
# # links = set()
# # scroll_pause_time = 5
# #
# # # Infinite scroll logic
# # while True:
# #     # Scroll step-by-step using PAGE_DOWN
# #     scrollable_div.send_keys(Keys.PAGE_DOWN)
# #     time.sleep(scroll_pause_time)
#
#     # Collect links
# links=set()
# link_elements = driver.find_elements(By.CSS_SELECTOR, 'a.job-card-container__link')
# for element in link_elements:
#     href = element.get_attribute("href")
#     if href:
#         links.add(href)
#
#     # Break condition: Check for sentinel presence
#     # sentinel = driver.find_elements(By.CSS_SELECTOR, 'div[data-results-list-top-scroll-sentinel]')
#     # if not sentinel:
#     #     break  # Stop scrolling when sentinel disappears
#
# # Display collected links
# for idx, link in enumerate(links, start=1):
#     print(f"{idx}. {link}")
#
# # Close the driver
# driver.quit()
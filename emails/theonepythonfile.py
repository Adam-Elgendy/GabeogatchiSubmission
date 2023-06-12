import pymongo as mong
import time, threading,signal,random,logging
import language_tool_python
from datetime import timedelta,datetime
import smtplib
from email.mime.text import MIMEText
import json

kLowestPossibleDelay = 300
kMinimumSecondsSinceLastEmail = 24 * 60**2


with open("./emails/secrets.json", "r") as secretsFile:
    secretsData = json.load(secretsFile)


client = mong.MongoClient(secretsData['mongoKey'])
db = client["User-Data"]
collection = db["content"]
userBase = collection.count() #No clue if this works but it cude yaknow ,3
class ProgramKilled(Exception):
    pass

def generateMessage():
    tool = language_tool_python.LanguageTool('en-US')
    themes = ['feed', 'play', 'clean', 'train', 'groom']
    theme = random.choice(themes)
    messages = [
        f"Hi there,\n\nIt's time to {theme} your Gabeagatchi! Don't forget to {theme} your Gabeagatchi today and check out our new {theme} items. You won't want to miss them!\n\nBest,\nThe Gabeagatchi Team",
        f"Hello,\n\nYour Gabeagatchi is waiting for you! Why not take some time today to {theme} your Gabeagatchi? We've got some new {theme} items that you might find useful. Check them out!\n\nBest,\nThe Gabeagatchi Team",
        f"Hi,\n\nWe hope you're enjoying your Gabeagatchi! We wanted to let you know that there are some new {theme} items available for your Gabeagatchi. Check them out and let us know what you think!\n\nBest,\nThe Gabeagatchi Team",
        f"Hello,\n\nIt's been a while since you've played with your Gabeagatchi. Why not take some time today to {theme} your Gabeagatchi? We've got some new {theme} items that you might find useful. Check them out!\n\nBest,\nThe Gabeagatchi Team",
    ]
    message = random.choice(messages).replace('{theme}', theme)
    matches = tool.check(message)
    message = language_tool_python.correct(message, matches)
    return message


def generateSubject():
    themes = ['feeding', 'playing', 'cleaning', 'training', 'grooming']
    theme = random.choice(themes) #redundant code, stops silly IDE error.
    subjects = [
        f"{theme.capitalize()} your Gabeagatchi",
        f"{theme.capitalize()} time for your Gabeagatchi",
        f"New {theme} items for your Gabeagatchi",
        f"Your Gabeagatchi misses you!",
        f"Come back to your Gabeagatchi!",
        f"Your Gabeagatchi is waiting for you!",
    ]
    subject = random.choice(subjects).replace('{theme}', random.choice(themes))
    return subject

def signal_handler(signum, frame):
    raise ProgramKilled

def sendEmail(victimDocument):
    email = victimDocument["email"]
    message = generateMessage()
    sender = "youremail@example.com" 
    password = "yourpassword"
    recipient = email

    msg = MIMEText(message)
    msg['Subject'] = generateSubject()
    msg['From'] = sender
    msg['To'] = recipient

    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(sender, password)
    server.sendmail(sender, recipient, msg.as_string())
    server.quit()

def foo():
    #Yes I could've used recursion
    #No I'm not using recursion
    running = True
    i=0
    while(running):
        randomNumber = random(0,collection.count_documents()) # Don't be the genius who's like 🤓 actually, itll never reach the last person because it will, i just don't want it to SKIP the last person. bungus.
        doc = db.collection.find().limit(-1).skip(randomNumber).next()
        if "lastEmailed" in doc:
            if (datetime.now - doc["lastEmailed"]).totalSeconds() > kMinimumSecondsSinceLastEmail:
                sendEmail(doc)
                running = False
            else:
                pass
        else:
            sendEmail(doc)
            collection.update_one(
            {"_id": doc["_id"]},
            {"$set": {"lastEmailed": datetime.now}}
        )
            running = False
        i += 1
        if(i>=10**5) or (i>= userBase+1):
             #Just call it a day...
             try:
                1/0
             except ZeroDivisionError:
                logging.exception(str(10**5) + " attempts ran without finding anyone viable. \nIf the userbase is still small ignore this, otherwise contact the developer. If you see this often contact the developer")


         
    
class Job(threading.Thread):
    def __init__(self,  execute, *args, **kwargs):
        threading.Thread.__init__(self)
        self.daemon = False
        self.stopped = threading.Event()
        self.interval = timedelta(seconds=(10**5 - userBase**1.115)) if ((10**5 - userBase**1.115) > kLowestPossibleDelay) else timedelta(seconds=kLowestPossibleDelay)
        self.execute = execute
        self.args = args
        self.kwargs = kwargs
        
    def stop(self):
                self.stopped.set()
                self.join()
    def run(self):
            while not self.stopped.wait(self.interval.total_seconds()):
                collection = db["content"]
                userBase = collection.count_documents()
                self.interval = timedelta(seconds=(10**5 - userBase *1.115)) if ((10**5 - userBase**1.115) > kLowestPossibleDelay) else timedelta(seconds=kLowestPossibleDelay)
                self.execute(*self.args, **self.kwargs)
            
if __name__ == "__main__":
    signal.signal(signal.SIGTERM, signal_handler)
    signal.signal(signal.SIGINT, signal_handler)
    job = Job(execute=foo)
    job.start()
    
    while True:
          try:
              time.sleep(1)
          except ProgramKilled:
              print("Program killed: running cleanup code")
              job.stop()
              break
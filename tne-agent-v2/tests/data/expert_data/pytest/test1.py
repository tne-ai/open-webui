from tne.TNE import TNE
import numpy as np
import pandas as pd 

UID = "113131128239301637682"

if __name__ == "__main__":
    session = TNE(UID)
    df = session.get_object('Margins.csv').head()
    arr = np.array([1,2,3])
    print("HELLO WORLD")
    result = df

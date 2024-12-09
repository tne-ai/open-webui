from tne.TNE import TNE
import numpy as np
import pandas as pd 

UID = "113131128239301637682"

if __name__ == "__main__":
    session = TNE(UID)
    test_input = PROCESS_INPUT
    result = test_input.to_string()

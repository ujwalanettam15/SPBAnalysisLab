
import numpy as np
import pandas as pd
from fdint import *

eta_values = np.linspace(-10, 10, 200000)

print(eta_values)

k0 = fdk(k=0.0, phi=eta_values)
k1 = fdk(k=1.0, phi=eta_values)
k05 = fdk(k=0.5, phi=eta_values)
k05neg = fdk(k=-0.5, phi=eta_values)
k2 = fdk(k=2.0, phi=eta_values)	# For Lorenz number

data = np.vstack((eta_values, k0, k1, k05, k05neg, k2)).T
columns = ['eta', 'k=0', 'k=1', 'k=0.5', 'k=-0.5', 'k=2']
df = pd.DataFrame(data, columns=columns)

df.to_csv("FermiDiracIntegrals.csv", index=False)

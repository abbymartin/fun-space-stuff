#import bpy 
import csv

# Settings 
name = 'stars' 


#get csv file
with open("C:/Users/836844/Documents/starchart/visiblestars.csv", "r") as file:
    reader = csv.reader(file)
    next(reader)
    #add spheres to screen
    for row in reader:
        print(row)
        #bpy.ops.mesh.primitive_ico_sphere_add(radius=0.5, location=(float(row[17]), float(row[18]), float(row[19])))   


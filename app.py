import pandas as pd
from flask import Flask, render_template, request

@app.route('/')
def index():
    return render('index.html')

@app.route('/results', methods=['POST'])
def results():
    file = request.files['inputFile']
    df = pd.read_excel(file)

    # Sum the first column
    sum_of_first_column = df.iloc[:, 0].astype(float).sum()

    # Count the number of rows in the first column
    num_of_rows = df.iloc[:, 0].count()

    # Calculate the average of the sum of the first column
    avg_of_first_column_sum = sum_of_first_column / num_of_rows

    # Get the duplicates in the ninth column and count how many times each value appears
    duplicates = df[df.duplicated(subset=[df.columns[8]], keep=False)]
    counted_duplicates = duplicates.groupby(df.columns[8]).size().reset_index(name='counts')

    # Count the number of duplicates in column 8
    duplicates = df.iloc[:, 8].duplicated(keep=False)
    duplicates_count = df[duplicates].groupby(df.iloc[:, 8]).size().sort_values(ascending=False).reset_index(name='counts')

    # Find rows containing "Xiaomi" in any column
    xiaomi_rows = df[df.apply(lambda row: row.astype(str).str.contains("Xiaomi", case=False, na=False).any(), axis=1)]

    # Find the date aligned with each row containing "Xiaomi" and count the duplicates for each date
    xiaomi_counts = xiaomi_rows.groupby(df.columns[5]).size().reset_index(name='counts')
    sorted_xiaomi_counts = xiaomi_counts.sort_values(by=df.columns[5])

    return render('results.html', 
                           duplicates_count=duplicates_count,
                           sum_of_first_column=sum_of_first_column,
                           avg_of_first_column_sum=avg_of_first_column_sum,
                           sorted_xiaomi_counts=sorted_xiaomi_counts)


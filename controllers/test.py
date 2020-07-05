@app.route('/job_vacancy_can/<id>')
def job_vacancy_can(id):
    # res = db.select("SELECT applytable.*,candidate_signup.* FROM candidate_signup,applytable WHERE applytable.vacancyid='"+id+"' AND candidate=candidate_signup.userID")

    db1 = Db()
    res = db1.selectOne("SELECT * FROM vacancyadd WHERE ID='"+id+"'")
    lis = []
    if res is not None:
        vskills = res['skill']
        vskills = vskills[:-1]
        vskill = vskills.split(',')
        vac_vector = []
        for vss in vskill:
            vac_vector.append(1)
        res2 = db1.select(
            "SELECT applytable.*,candidate_signup.* FROM candidate_signup,applytable WHERE applytable.vacancyid='"+id+"' AND candidate=candidate_signup.userID")
        if len(res2) > 0:
            for k in res2:
                res3 = db1.select("SELECT * FROM studentskills WHERE userID='" + str(k['candidate']) + "'")
                if len(res3) > 0:
                    can_vec = []
                    can_skill = []
                    for k2 in res3:
                        can_skill.append(k2['skillID'])
                    for vs in vskill:
                        sts = 0
                        if vs in can_skill:
                            sts = 1
                        can_vec.append(sts)

                    from numpy import dot
                    from numpy.linalg import norm
                    cos_sim = dot(vac_vector, can_vec) / (norm(vac_vector) * norm(can_vec))

                    if cos_sim > .4:
                        lis.append(k)
    print("=====",lis)
    return render_template('company view candidates.html', data=lis)
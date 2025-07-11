select pr.idProfesion, pr.titulo, pr.estado, pr.descripcion, COUNT(pe.profesionIdProfesion) 
as personal from profesion pr left join 
personal pe on  pr.idProfesion = pe.profesionIdProfesion 
group by pe.estado, pr.idProfesion, pr.titulo, pr.estado, pr.descripcion

--Total Profesiones
select count(*) as Total from profesion

--Total Profesiones Activas
select count(*) as Total from profesion where estado = 1

--Personal Asignado
select count(pr.idProfesion) as Total from profesion pr inner join personal pe on pe.profesionIdProfesion = pr.idProfesion

--Mayor demanda
select top 1 COUNT(pe.profesionIdProfesion) 
as cantidad,pr.titulo from profesion pr left join 
personal pe on  pr.idProfesion = pe.profesionIdProfesion
where pr.estado = 1
group by  pr.idProfesion, pr.titulo
order by cantidad desc